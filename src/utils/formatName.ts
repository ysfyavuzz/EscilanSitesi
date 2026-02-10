/**
 * Display Name Formatting Utility
 *
 * Formats user display names according to privacy level settings.
 * Used throughout the application to protect user identity.
 *
 * @module utils/formatName
 * @category Utilities
 */

export type PrivacyLevel = "full" | "partial" | "hidden";

/**
 * Format display name based on privacy level
 *
 * @param fullName - The complete name to format
 * @param privacyLevel - Privacy level (full, partial, or hidden)
 * @returns Formatted name string
 *
 * @example
 * ```typescript
 * formatDisplayName("Ahmet Yılmaz", "full")     // "Ahmet Yılmaz"
 * formatDisplayName("Ahmet Yılmaz", "partial")  // "Ahmet Y*****"
 * formatDisplayName("Ahmet Yılmaz", "hidden")   // "A***** Y*****"
 * ```
 */
export function formatDisplayName(
  fullName: string,
  privacyLevel: PrivacyLevel = "partial",
): string {
  if (!fullName || fullName.trim() === "") {
    return "Anonymous";
  }

  // Full privacy - return as is
  if (privacyLevel === "full") {
    return fullName;
  }

  // Split name into parts
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[0];
  const lastName = parts.length > 1 ? parts[parts.length - 1] : "";

  // Partial privacy - hide last name except first letter
  if (privacyLevel === "partial") {
    if (!lastName) {
      // Single name, show first letter + stars
      return (
        firstName.charAt(0) + "*".repeat(Math.max(firstName.length - 1, 1))
      );
    }
    return `${firstName} ${lastName.charAt(0)}${"*".repeat(Math.max(lastName.length - 1, 1))}`;
  }

  // Hidden privacy - hide both names except first letters
  if (privacyLevel === "hidden") {
    const maskedFirst =
      firstName.charAt(0) + "*".repeat(Math.max(firstName.length - 1, 1));
    const maskedLast = lastName
      ? " " + lastName.charAt(0) + "*".repeat(Math.max(lastName.length - 1, 1))
      : "";
    return maskedFirst + maskedLast;
  }

  // Fallback
  return fullName;
}

/**
 * Extract initials from name
 *
 * @param fullName - The complete name
 * @returns Initials (e.g., "AY" for "Ahmet Yılmaz")
 *
 * @example
 * ```typescript
 * getInitials("Ahmet Yılmaz")  // "AY"
 * getInitials("John")          // "J"
 * ```
 */
export function getInitials(fullName: string): string {
  if (!fullName || fullName.trim() === "") {
    return "?";
  }

  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (
    parts[0].charAt(0).toUpperCase() +
    parts[parts.length - 1].charAt(0).toUpperCase()
  );
}

/**
 * Mask email address for privacy
 *
 * @param email - Email address to mask
 * @returns Masked email (e.g., "a***@example.com")
 *
 * @example
 * ```typescript
 * maskEmail("ahmet@example.com")  // "a***@example.com"
 * ```
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes("@")) {
    return "***";
  }

  const [local, domain] = email.split("@");
  const maskedLocal =
    local.charAt(0) + "*".repeat(Math.max(local.length - 1, 3));
  return `${maskedLocal}@${domain}`;
}

/**
 * Mask phone number for privacy
 *
 * @param phone - Phone number to mask
 * @returns Masked phone (e.g., "+90 *** *** 12 34")
 *
 * @example
 * ```typescript
 * maskPhone("+90 532 123 45 67")  // "+90 *** *** 45 67"
 * ```
 */
export function maskPhone(phone: string): string {
  if (!phone || phone.trim() === "") {
    return "***";
  }

  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, "");

  // Show country code and last 4 digits
  if (cleaned.length > 4) {
    const countryCode = cleaned.startsWith("+") ? cleaned.slice(0, 3) : "";
    const lastFour = cleaned.slice(-4);
    return `${countryCode} *** *** ${lastFour.slice(0, 2)} ${lastFour.slice(2)}`;
  }

  return "*** *** ** **";
}

/**
 * Check if name requires masking based on privacy level
 *
 * @param privacyLevel - Privacy level to check
 * @returns True if masking is needed
 */
export function shouldMaskName(privacyLevel: PrivacyLevel): boolean {
  return privacyLevel !== "full";
}

/**
 * Get privacy level description
 *
 * @param privacyLevel - Privacy level
 * @returns Human-readable description
 */
export function getPrivacyLevelDescription(privacyLevel: PrivacyLevel): string {
  const descriptions: Record<PrivacyLevel, string> = {
    full: "Tam adınız görünür (örn: Ahmet Yılmaz)",
    partial: "Soyadınız gizlenir (örn: Ahmet Y*****)",
    hidden: "Tüm adınız gizlenir (örn: A***** Y*****)",
  };
  return descriptions[privacyLevel] || descriptions.partial;
}

/**
 * Format name for display in UI components
 * Combines name formatting with optional title
 *
 * @param fullName - The complete name
 * @param privacyLevel - Privacy level
 * @param title - Optional title (e.g., "VIP", "Verified")
 * @returns Formatted name with title
 */
export function formatNameWithTitle(
  fullName: string,
  privacyLevel: PrivacyLevel,
  title?: string,
): string {
  const formattedName = formatDisplayName(fullName, privacyLevel);
  return title ? `${formattedName} • ${title}` : formattedName;
}
