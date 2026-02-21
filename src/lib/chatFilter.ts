/**
 * Chat Content Filter (AI Word Filter)
 *
 * Server-side utility for filtering offensive / prohibited content
 * in chat messages. Runs synchronously before message is stored.
 *
 * Categories:
 *  - BLOCKED: Message is fully rejected (explicit harassment, hate speech)
 *  - WARN: Message is stored but flagged for admin review
 *  - CLEAN: Message passes all filters
 */

export type FilterResult =
    | { status: 'CLEAN' }
    | { status: 'WARN'; reason: string; matchedTerms: string[] }
    | { status: 'BLOCKED'; reason: string; matchedTerms: string[] };

// ---------------------------------------------------------------------------
// Term lists
// ---------------------------------------------------------------------------

/** Messages containing these terms are hard-blocked */
const BLOCKED_TERMS: string[] = [
    // Haraket / Tehdit
    'seni öldürürüm', 'seni bulurum', 'adresini biliyorum', 'pişman ederim',
    // Dolandırıcılık
    'iban ver', 'kart numaranı ver', 'kripto gönder', 'wire transfer',
    // Çocuk ihlali
    'çocuk', 'küçük', 'reşit değil',
    // Doxing / Doğrulama isteme
    'tc kimlik', 'tc no', 'kimlik numarası', 'nüfus cüzdanı no',
];

/** Messages containing these terms are flagged (stored but admin review) */
const WARN_TERMS: string[] = [
    // Platform dışı iletişim
    'whatsapp', 'telegram', 'instagram dm', 'signal', 'snapchat',
    // Doğrudan ödeme talepleri
    'nakit', 'peşin', 'şimdi öde', 'havale at', 'papara',
    // Küfür / hakaret (hafif)
    'aptal', 'salak', 'gerizekalı', 'mal',
    // Reklam
    'siteyi ziyaret et', 'linkime tıkla', 'indirimli fiyat',
];

// ---------------------------------------------------------------------------
// Normalisation helpers
// ---------------------------------------------------------------------------

function normalise(text: string): string {
    return text
        .toLowerCase()
        .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
        .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
        // Strip special chars (keeping spaces)
        .replace(/[^a-z0-9 ]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function findMatches(normalisedContent: string, terms: string[]): string[] {
    return terms.filter(term => normalisedContent.includes(normalise(term)));
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function filterChatMessage(content: string): FilterResult {
    const norm = normalise(content);

    const blocked = findMatches(norm, BLOCKED_TERMS);
    if (blocked.length > 0) {
        return {
            status: 'BLOCKED',
            reason: 'Mesaj platform kurallarını ihlal ettiği için gönderilemedi.',
            matchedTerms: blocked,
        };
    }

    const warned = findMatches(norm, WARN_TERMS);
    if (warned.length > 0) {
        return {
            status: 'WARN',
            reason: 'Mesaj inceleme için işaretlendi.',
            matchedTerms: warned,
        };
    }

    return { status: 'CLEAN' };
}

/**
 * Integrate into the chat send mutation:
 *
 * const result = filterChatMessage(input.content);
 * if (result.status === 'BLOCKED') {
 *   throw new TRPCError({ code: 'BAD_REQUEST', message: result.reason });
 * }
 * // store message, if WARN set a flag on the message row for admin review
 */
