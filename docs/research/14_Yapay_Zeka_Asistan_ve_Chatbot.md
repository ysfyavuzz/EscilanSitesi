# 14 - Yapay Zeka Asistan (Zuhre AI Concierge)

Kullanıcıların site içinde kaybolmadan, sohbet ederek aradıklarını bulmasını sağlayan akıllı asistan.

## 🎯 Araştırma Hedefi
LLM (Large Language Model) tabanlı, doğal dil işleme yeteneğine sahip bir "Concierge" botu. "Bana mavi gözlü, 1.70 boylarında, Şişli'de bir ilan bul" gibi kompleks sorguları anlayıp veritabanından filtreleme yapabilmesi.

## 🤖 Önerilen Yapay Zeka
**GPT-4o** (Konuşma tasarımı ve kişilik oluşturma) + **Claude 3.5 Sonnet** (RAG - Retrieval Augmented Generation mimarisi).

## 📝 Araştırma Kaydı
| Özellik | Kullanılan Teknoloji | Beklenen Deneyim |
|---------|----------------------|------------------|
| Doğal Dil Arama | Vector Database (Pinecone) | "Arkadaşımla konuşur gibi arama" |

## 🚀 Önerilen Kapsamlı Prompt
> "Bir ilan sitesi için 'Conversational Search' (Sohbet Tabanlı Arama) özelliğine sahip 'Zuhre AI' asistanını tasarla. Kullanıcının serbest metin (free-text) olarak girdiği istekleri (Örn: 'Akşam 8 gibi müsait, İngilizce bilen biri') analiz edip, PostgreSQL veritabanındaki JSON özelliklerle eşleştiren bir RAG (Retrieval-Augmented Generation) mimarisi kur. Bu asistanın 'Flörtöz ama Profesyonel' bir kişiliğe sahip olması için gereken 'System Prompt' detaylarını yaz."

---
*Zühre Planet: Geleceğin Deneyimi Serisi*
