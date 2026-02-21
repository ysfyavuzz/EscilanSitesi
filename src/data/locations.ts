export interface Neighborhood {
  id: string;
  name: string;
  slug: string;
}

export interface District {
  id: string;
  name: string;
  slug: string;
  neighborhoods?: Neighborhood[];
}

export interface City {
  id: string;
  name: string;
  slug: string;
  districts: District[];
}

export const TURKEY_LOCATIONS: City[] = [
  {
    "id": "01",
    "name": "Adana",
    "slug": "adana",
    "districts": [
      {
        "id": "01_aladag",
        "name": "Aladağ",
        "slug": "aladag",
        "neighborhoods": []
      },
      {
        "id": "01_ceyhan",
        "name": "Ceyhan",
        "slug": "ceyhan",
        "neighborhoods": []
      },
      {
        "id": "01_cukurova",
        "name": "Çukurova",
        "slug": "cukurova",
        "neighborhoods": []
      },
      {
        "id": "01_feke",
        "name": "Feke",
        "slug": "feke",
        "neighborhoods": []
      },
      {
        "id": "01_i-mamoglu",
        "name": "İmamoğlu",
        "slug": "i-mamoglu",
        "neighborhoods": []
      },
      {
        "id": "01_karaisali",
        "name": "Karaisalı",
        "slug": "karaisali",
        "neighborhoods": []
      },
      {
        "id": "01_karatas",
        "name": "Karataş",
        "slug": "karatas",
        "neighborhoods": []
      },
      {
        "id": "01_kozan",
        "name": "Kozan",
        "slug": "kozan",
        "neighborhoods": []
      },
      {
        "id": "01_pozanti",
        "name": "Pozantı",
        "slug": "pozanti",
        "neighborhoods": []
      },
      {
        "id": "01_saimbeyli",
        "name": "Saimbeyli",
        "slug": "saimbeyli",
        "neighborhoods": []
      },
      {
        "id": "01_saricam",
        "name": "Sarıçam",
        "slug": "saricam",
        "neighborhoods": []
      },
      {
        "id": "01_seyhan",
        "name": "Seyhan",
        "slug": "seyhan",
        "neighborhoods": []
      },
      {
        "id": "01_tufanbeyli",
        "name": "Tufanbeyli",
        "slug": "tufanbeyli",
        "neighborhoods": []
      },
      {
        "id": "01_yumurtalik",
        "name": "Yumurtalık",
        "slug": "yumurtalik",
        "neighborhoods": []
      },
      {
        "id": "01_yuregir",
        "name": "Yüreğir",
        "slug": "yuregir",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "02",
    "name": "Adıyaman",
    "slug": "adiyaman",
    "districts": [
      {
        "id": "02_besni",
        "name": "Besni",
        "slug": "besni",
        "neighborhoods": []
      },
      {
        "id": "02_celikhan",
        "name": "Çelikhan",
        "slug": "celikhan",
        "neighborhoods": []
      },
      {
        "id": "02_gerger",
        "name": "Gerger",
        "slug": "gerger",
        "neighborhoods": []
      },
      {
        "id": "02_golbasi",
        "name": "Gölbaşı",
        "slug": "golbasi",
        "neighborhoods": []
      },
      {
        "id": "02_kahta",
        "name": "Kahta",
        "slug": "kahta",
        "neighborhoods": []
      },
      {
        "id": "02_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "02_samsat",
        "name": "Samsat",
        "slug": "samsat",
        "neighborhoods": []
      },
      {
        "id": "02_sincik",
        "name": "Sincik",
        "slug": "sincik",
        "neighborhoods": []
      },
      {
        "id": "02_tut",
        "name": "Tut",
        "slug": "tut",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "03",
    "name": "Afyonkarahisar",
    "slug": "afyonkarahisar",
    "districts": [
      {
        "id": "03_basmakci",
        "name": "Başmakçı",
        "slug": "basmakci",
        "neighborhoods": []
      },
      {
        "id": "03_bayat",
        "name": "Bayat",
        "slug": "bayat",
        "neighborhoods": []
      },
      {
        "id": "03_bolvadin",
        "name": "Bolvadin",
        "slug": "bolvadin",
        "neighborhoods": []
      },
      {
        "id": "03_cay",
        "name": "Çay",
        "slug": "cay",
        "neighborhoods": []
      },
      {
        "id": "03_cobanlar",
        "name": "Çobanlar",
        "slug": "cobanlar",
        "neighborhoods": []
      },
      {
        "id": "03_dazkiri",
        "name": "Dazkırı",
        "slug": "dazkiri",
        "neighborhoods": []
      },
      {
        "id": "03_dinar",
        "name": "Dinar",
        "slug": "dinar",
        "neighborhoods": []
      },
      {
        "id": "03_emirdag",
        "name": "Emirdağ",
        "slug": "emirdag",
        "neighborhoods": []
      },
      {
        "id": "03_evciler",
        "name": "Evciler",
        "slug": "evciler",
        "neighborhoods": []
      },
      {
        "id": "03_hocalar",
        "name": "Hocalar",
        "slug": "hocalar",
        "neighborhoods": []
      },
      {
        "id": "03_i-hsaniye",
        "name": "İhsaniye",
        "slug": "i-hsaniye",
        "neighborhoods": []
      },
      {
        "id": "03_i-scehisar",
        "name": "İscehisar",
        "slug": "i-scehisar",
        "neighborhoods": []
      },
      {
        "id": "03_kiziloren",
        "name": "Kızılören",
        "slug": "kiziloren",
        "neighborhoods": []
      },
      {
        "id": "03_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "03_sandikli",
        "name": "Sandıklı",
        "slug": "sandikli",
        "neighborhoods": []
      },
      {
        "id": "03_sinanpasa",
        "name": "Sinanpaşa",
        "slug": "sinanpasa",
        "neighborhoods": []
      },
      {
        "id": "03_sultandagi",
        "name": "Sultandağı",
        "slug": "sultandagi",
        "neighborhoods": []
      },
      {
        "id": "03_suhut",
        "name": "Şuhut",
        "slug": "suhut",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "04",
    "name": "Ağrı",
    "slug": "agri",
    "districts": [
      {
        "id": "04_diyadin",
        "name": "Diyadin",
        "slug": "diyadin",
        "neighborhoods": []
      },
      {
        "id": "04_dogubayazit",
        "name": "Doğubayazıt",
        "slug": "dogubayazit",
        "neighborhoods": []
      },
      {
        "id": "04_eleskirt",
        "name": "Eleşkirt",
        "slug": "eleskirt",
        "neighborhoods": []
      },
      {
        "id": "04_hamur",
        "name": "Hamur",
        "slug": "hamur",
        "neighborhoods": []
      },
      {
        "id": "04_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "04_patnos",
        "name": "Patnos",
        "slug": "patnos",
        "neighborhoods": []
      },
      {
        "id": "04_taslicay",
        "name": "Taşlıçay",
        "slug": "taslicay",
        "neighborhoods": []
      },
      {
        "id": "04_tutak",
        "name": "Tutak",
        "slug": "tutak",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "05",
    "name": "Amasya",
    "slug": "amasya",
    "districts": [
      {
        "id": "05_goynucek",
        "name": "Göynücek",
        "slug": "goynucek",
        "neighborhoods": []
      },
      {
        "id": "05_gumushacikoy",
        "name": "Gümüşhacıköy",
        "slug": "gumushacikoy",
        "neighborhoods": []
      },
      {
        "id": "05_hamamozu",
        "name": "Hamamözü",
        "slug": "hamamozu",
        "neighborhoods": []
      },
      {
        "id": "05_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "05_merzifon",
        "name": "Merzifon",
        "slug": "merzifon",
        "neighborhoods": []
      },
      {
        "id": "05_suluova",
        "name": "Suluova",
        "slug": "suluova",
        "neighborhoods": []
      },
      {
        "id": "05_tasova",
        "name": "Taşova",
        "slug": "tasova",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "06",
    "name": "Ankara",
    "slug": "ankara",
    "districts": [
      {
        "id": "06_akyurt",
        "name": "Akyurt",
        "slug": "akyurt",
        "neighborhoods": []
      },
      {
        "id": "06_altindag",
        "name": "Altındağ",
        "slug": "altindag",
        "neighborhoods": []
      },
      {
        "id": "06_ayas",
        "name": "Ayaş",
        "slug": "ayas",
        "neighborhoods": []
      },
      {
        "id": "06_bala",
        "name": "Bala",
        "slug": "bala",
        "neighborhoods": []
      },
      {
        "id": "06_beypazari",
        "name": "Beypazarı",
        "slug": "beypazari",
        "neighborhoods": []
      },
      {
        "id": "06_camlidere",
        "name": "Çamlıdere",
        "slug": "camlidere",
        "neighborhoods": []
      },
      {
        "id": "06_cankaya",
        "name": "Çankaya",
        "slug": "cankaya",
        "neighborhoods": []
      },
      {
        "id": "06_cubuk",
        "name": "Çubuk",
        "slug": "cubuk",
        "neighborhoods": []
      },
      {
        "id": "06_elmadag",
        "name": "Elmadağ",
        "slug": "elmadag",
        "neighborhoods": []
      },
      {
        "id": "06_etimesgut",
        "name": "Etimesgut",
        "slug": "etimesgut",
        "neighborhoods": []
      },
      {
        "id": "06_evren",
        "name": "Evren",
        "slug": "evren",
        "neighborhoods": []
      },
      {
        "id": "06_golbasi",
        "name": "Gölbaşı",
        "slug": "golbasi",
        "neighborhoods": []
      },
      {
        "id": "06_gudul",
        "name": "Güdül",
        "slug": "gudul",
        "neighborhoods": []
      },
      {
        "id": "06_haymana",
        "name": "Haymana",
        "slug": "haymana",
        "neighborhoods": []
      },
      {
        "id": "06_kahramankazan",
        "name": "Kahramankazan",
        "slug": "kahramankazan",
        "neighborhoods": []
      },
      {
        "id": "06_kalecik",
        "name": "Kalecik",
        "slug": "kalecik",
        "neighborhoods": []
      },
      {
        "id": "06_kecioren",
        "name": "Keçiören",
        "slug": "kecioren",
        "neighborhoods": []
      },
      {
        "id": "06_kizilcahamam",
        "name": "Kızılcahamam",
        "slug": "kizilcahamam",
        "neighborhoods": []
      },
      {
        "id": "06_mamak",
        "name": "Mamak",
        "slug": "mamak",
        "neighborhoods": []
      },
      {
        "id": "06_nallihan",
        "name": "Nallıhan",
        "slug": "nallihan",
        "neighborhoods": []
      },
      {
        "id": "06_polatli",
        "name": "Polatlı",
        "slug": "polatli",
        "neighborhoods": []
      },
      {
        "id": "06_pursaklar",
        "name": "Pursaklar",
        "slug": "pursaklar",
        "neighborhoods": []
      },
      {
        "id": "06_sincan",
        "name": "Sincan",
        "slug": "sincan",
        "neighborhoods": []
      },
      {
        "id": "06_sereflikochisar",
        "name": "Şereflikoçhisar",
        "slug": "sereflikochisar",
        "neighborhoods": []
      },
      {
        "id": "06_yenimahalle",
        "name": "Yenimahalle",
        "slug": "yenimahalle",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "07",
    "name": "Antalya",
    "slug": "antalya",
    "districts": [
      {
        "id": "07_akseki",
        "name": "Akseki",
        "slug": "akseki",
        "neighborhoods": []
      },
      {
        "id": "07_aksu",
        "name": "Aksu",
        "slug": "aksu",
        "neighborhoods": []
      },
      {
        "id": "07_alanya",
        "name": "Alanya",
        "slug": "alanya",
        "neighborhoods": []
      },
      {
        "id": "07_demre",
        "name": "Demre",
        "slug": "demre",
        "neighborhoods": []
      },
      {
        "id": "07_dosemealti",
        "name": "Döşemealtı",
        "slug": "dosemealti",
        "neighborhoods": []
      },
      {
        "id": "07_elmali",
        "name": "Elmalı",
        "slug": "elmali",
        "neighborhoods": []
      },
      {
        "id": "07_finike",
        "name": "Finike",
        "slug": "finike",
        "neighborhoods": []
      },
      {
        "id": "07_gazipasa",
        "name": "Gazipaşa",
        "slug": "gazipasa",
        "neighborhoods": []
      },
      {
        "id": "07_gundogmus",
        "name": "Gündoğmuş",
        "slug": "gundogmus",
        "neighborhoods": []
      },
      {
        "id": "07_i-bradi",
        "name": "İbradı",
        "slug": "i-bradi",
        "neighborhoods": []
      },
      {
        "id": "07_kas",
        "name": "Kaş",
        "slug": "kas",
        "neighborhoods": []
      },
      {
        "id": "07_kemer",
        "name": "Kemer",
        "slug": "kemer",
        "neighborhoods": []
      },
      {
        "id": "07_kepez",
        "name": "Kepez",
        "slug": "kepez",
        "neighborhoods": []
      },
      {
        "id": "07_konyaalti",
        "name": "Konyaaltı",
        "slug": "konyaalti",
        "neighborhoods": []
      },
      {
        "id": "07_korkuteli",
        "name": "Korkuteli",
        "slug": "korkuteli",
        "neighborhoods": []
      },
      {
        "id": "07_kumluca",
        "name": "Kumluca",
        "slug": "kumluca",
        "neighborhoods": []
      },
      {
        "id": "07_manavgat",
        "name": "Manavgat",
        "slug": "manavgat",
        "neighborhoods": []
      },
      {
        "id": "07_muratpasa",
        "name": "Muratpaşa",
        "slug": "muratpasa",
        "neighborhoods": []
      },
      {
        "id": "07_serik",
        "name": "Serik",
        "slug": "serik",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "08",
    "name": "Artvin",
    "slug": "artvin",
    "districts": [
      {
        "id": "08_ardanuc",
        "name": "Ardanuç",
        "slug": "ardanuc",
        "neighborhoods": []
      },
      {
        "id": "08_arhavi",
        "name": "Arhavi",
        "slug": "arhavi",
        "neighborhoods": []
      },
      {
        "id": "08_borcka",
        "name": "Borçka",
        "slug": "borcka",
        "neighborhoods": []
      },
      {
        "id": "08_hopa",
        "name": "Hopa",
        "slug": "hopa",
        "neighborhoods": []
      },
      {
        "id": "08_kemalpasa",
        "name": "Kemalpaşa",
        "slug": "kemalpasa",
        "neighborhoods": []
      },
      {
        "id": "08_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "08_murgul",
        "name": "Murgul",
        "slug": "murgul",
        "neighborhoods": []
      },
      {
        "id": "08_savsat",
        "name": "Şavşat",
        "slug": "savsat",
        "neighborhoods": []
      },
      {
        "id": "08_yusufeli",
        "name": "Yusufeli",
        "slug": "yusufeli",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "09",
    "name": "Aydın",
    "slug": "aydin",
    "districts": [
      {
        "id": "09_bozdogan",
        "name": "Bozdoğan",
        "slug": "bozdogan",
        "neighborhoods": []
      },
      {
        "id": "09_buharkent",
        "name": "Buharkent",
        "slug": "buharkent",
        "neighborhoods": []
      },
      {
        "id": "09_cine",
        "name": "Çine",
        "slug": "cine",
        "neighborhoods": []
      },
      {
        "id": "09_didim",
        "name": "Didim",
        "slug": "didim",
        "neighborhoods": []
      },
      {
        "id": "09_efeler",
        "name": "Efeler",
        "slug": "efeler",
        "neighborhoods": []
      },
      {
        "id": "09_germencik",
        "name": "Germencik",
        "slug": "germencik",
        "neighborhoods": []
      },
      {
        "id": "09_i-ncirliova",
        "name": "İncirliova",
        "slug": "i-ncirliova",
        "neighborhoods": []
      },
      {
        "id": "09_karacasu",
        "name": "Karacasu",
        "slug": "karacasu",
        "neighborhoods": []
      },
      {
        "id": "09_karpuzlu",
        "name": "Karpuzlu",
        "slug": "karpuzlu",
        "neighborhoods": []
      },
      {
        "id": "09_kocarli",
        "name": "Koçarlı",
        "slug": "kocarli",
        "neighborhoods": []
      },
      {
        "id": "09_kosk",
        "name": "Köşk",
        "slug": "kosk",
        "neighborhoods": []
      },
      {
        "id": "09_kusadasi",
        "name": "Kuşadası",
        "slug": "kusadasi",
        "neighborhoods": []
      },
      {
        "id": "09_kuyucak",
        "name": "Kuyucak",
        "slug": "kuyucak",
        "neighborhoods": []
      },
      {
        "id": "09_nazilli",
        "name": "Nazilli",
        "slug": "nazilli",
        "neighborhoods": []
      },
      {
        "id": "09_soke",
        "name": "Söke",
        "slug": "soke",
        "neighborhoods": []
      },
      {
        "id": "09_sultanhisar",
        "name": "Sultanhisar",
        "slug": "sultanhisar",
        "neighborhoods": []
      },
      {
        "id": "09_yenipazar",
        "name": "Yenipazar",
        "slug": "yenipazar",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "10",
    "name": "Balıkesir",
    "slug": "balikesir",
    "districts": [
      {
        "id": "10_altieylul",
        "name": "Altıeylül",
        "slug": "altieylul",
        "neighborhoods": []
      },
      {
        "id": "10_ayvalik",
        "name": "Ayvalık",
        "slug": "ayvalik",
        "neighborhoods": []
      },
      {
        "id": "10_balya",
        "name": "Balya",
        "slug": "balya",
        "neighborhoods": []
      },
      {
        "id": "10_bandirma",
        "name": "Bandırma",
        "slug": "bandirma",
        "neighborhoods": []
      },
      {
        "id": "10_bigadic",
        "name": "Bigadiç",
        "slug": "bigadic",
        "neighborhoods": []
      },
      {
        "id": "10_burhaniye",
        "name": "Burhaniye",
        "slug": "burhaniye",
        "neighborhoods": []
      },
      {
        "id": "10_dursunbey",
        "name": "Dursunbey",
        "slug": "dursunbey",
        "neighborhoods": []
      },
      {
        "id": "10_edremit",
        "name": "Edremit",
        "slug": "edremit",
        "neighborhoods": []
      },
      {
        "id": "10_erdek",
        "name": "Erdek",
        "slug": "erdek",
        "neighborhoods": []
      },
      {
        "id": "10_gomec",
        "name": "Gömeç",
        "slug": "gomec",
        "neighborhoods": []
      },
      {
        "id": "10_gonen",
        "name": "Gönen",
        "slug": "gonen",
        "neighborhoods": []
      },
      {
        "id": "10_havran",
        "name": "Havran",
        "slug": "havran",
        "neighborhoods": []
      },
      {
        "id": "10_i-vrindi",
        "name": "İvrindi",
        "slug": "i-vrindi",
        "neighborhoods": []
      },
      {
        "id": "10_karesi",
        "name": "Karesi",
        "slug": "karesi",
        "neighborhoods": []
      },
      {
        "id": "10_kepsut",
        "name": "Kepsut",
        "slug": "kepsut",
        "neighborhoods": []
      },
      {
        "id": "10_manyas",
        "name": "Manyas",
        "slug": "manyas",
        "neighborhoods": []
      },
      {
        "id": "10_marmara",
        "name": "Marmara",
        "slug": "marmara",
        "neighborhoods": []
      },
      {
        "id": "10_savastepe",
        "name": "Savaştepe",
        "slug": "savastepe",
        "neighborhoods": []
      },
      {
        "id": "10_sindirgi",
        "name": "Sındırgı",
        "slug": "sindirgi",
        "neighborhoods": []
      },
      {
        "id": "10_susurluk",
        "name": "Susurluk",
        "slug": "susurluk",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "11",
    "name": "Bilecik",
    "slug": "bilecik",
    "districts": [
      {
        "id": "11_bozuyuk",
        "name": "Bozüyük",
        "slug": "bozuyuk",
        "neighborhoods": []
      },
      {
        "id": "11_golpazari",
        "name": "Gölpazarı",
        "slug": "golpazari",
        "neighborhoods": []
      },
      {
        "id": "11_i-nhisar",
        "name": "İnhisar",
        "slug": "i-nhisar",
        "neighborhoods": []
      },
      {
        "id": "11_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "11_osmaneli",
        "name": "Osmaneli",
        "slug": "osmaneli",
        "neighborhoods": []
      },
      {
        "id": "11_pazaryeri",
        "name": "Pazaryeri",
        "slug": "pazaryeri",
        "neighborhoods": []
      },
      {
        "id": "11_sogut",
        "name": "Söğüt",
        "slug": "sogut",
        "neighborhoods": []
      },
      {
        "id": "11_yenipazar",
        "name": "Yenipazar",
        "slug": "yenipazar",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "12",
    "name": "Bingöl",
    "slug": "bingol",
    "districts": [
      {
        "id": "12_adakli",
        "name": "Adaklı",
        "slug": "adakli",
        "neighborhoods": []
      },
      {
        "id": "12_genc",
        "name": "Genç",
        "slug": "genc",
        "neighborhoods": []
      },
      {
        "id": "12_karliova",
        "name": "Karlıova",
        "slug": "karliova",
        "neighborhoods": []
      },
      {
        "id": "12_kigi",
        "name": "Kiğı",
        "slug": "kigi",
        "neighborhoods": []
      },
      {
        "id": "12_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "12_solhan",
        "name": "Solhan",
        "slug": "solhan",
        "neighborhoods": []
      },
      {
        "id": "12_yayladere",
        "name": "Yayladere",
        "slug": "yayladere",
        "neighborhoods": []
      },
      {
        "id": "12_yedisu",
        "name": "Yedisu",
        "slug": "yedisu",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "13",
    "name": "Bitlis",
    "slug": "bitlis",
    "districts": [
      {
        "id": "13_adilcevaz",
        "name": "Adilcevaz",
        "slug": "adilcevaz",
        "neighborhoods": []
      },
      {
        "id": "13_ahlat",
        "name": "Ahlat",
        "slug": "ahlat",
        "neighborhoods": []
      },
      {
        "id": "13_guroymak",
        "name": "Güroymak",
        "slug": "guroymak",
        "neighborhoods": []
      },
      {
        "id": "13_hizan",
        "name": "Hizan",
        "slug": "hizan",
        "neighborhoods": []
      },
      {
        "id": "13_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "13_mutki",
        "name": "Mutki",
        "slug": "mutki",
        "neighborhoods": []
      },
      {
        "id": "13_tatvan",
        "name": "Tatvan",
        "slug": "tatvan",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "14",
    "name": "Bolu",
    "slug": "bolu",
    "districts": [
      {
        "id": "14_dortdivan",
        "name": "Dörtdivan",
        "slug": "dortdivan",
        "neighborhoods": []
      },
      {
        "id": "14_gerede",
        "name": "Gerede",
        "slug": "gerede",
        "neighborhoods": []
      },
      {
        "id": "14_goynuk",
        "name": "Göynük",
        "slug": "goynuk",
        "neighborhoods": []
      },
      {
        "id": "14_kibriscik",
        "name": "Kıbrıscık",
        "slug": "kibriscik",
        "neighborhoods": []
      },
      {
        "id": "14_mengen",
        "name": "Mengen",
        "slug": "mengen",
        "neighborhoods": []
      },
      {
        "id": "14_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "14_mudurnu",
        "name": "Mudurnu",
        "slug": "mudurnu",
        "neighborhoods": []
      },
      {
        "id": "14_seben",
        "name": "Seben",
        "slug": "seben",
        "neighborhoods": []
      },
      {
        "id": "14_yenicaga",
        "name": "Yeniçağa",
        "slug": "yenicaga",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "15",
    "name": "Burdur",
    "slug": "burdur",
    "districts": [
      {
        "id": "15_aglasun",
        "name": "Ağlasun",
        "slug": "aglasun",
        "neighborhoods": []
      },
      {
        "id": "15_altinyayla",
        "name": "Altınyayla",
        "slug": "altinyayla",
        "neighborhoods": []
      },
      {
        "id": "15_bucak",
        "name": "Bucak",
        "slug": "bucak",
        "neighborhoods": []
      },
      {
        "id": "15_cavdir",
        "name": "Çavdır",
        "slug": "cavdir",
        "neighborhoods": []
      },
      {
        "id": "15_celtikci",
        "name": "Çeltikçi",
        "slug": "celtikci",
        "neighborhoods": []
      },
      {
        "id": "15_golhisar",
        "name": "Gölhisar",
        "slug": "golhisar",
        "neighborhoods": []
      },
      {
        "id": "15_karamanli",
        "name": "Karamanlı",
        "slug": "karamanli",
        "neighborhoods": []
      },
      {
        "id": "15_kemer",
        "name": "Kemer",
        "slug": "kemer",
        "neighborhoods": []
      },
      {
        "id": "15_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "15_tefenni",
        "name": "Tefenni",
        "slug": "tefenni",
        "neighborhoods": []
      },
      {
        "id": "15_yesilova",
        "name": "Yeşilova",
        "slug": "yesilova",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "16",
    "name": "Bursa",
    "slug": "bursa",
    "districts": [
      {
        "id": "16_buyukorhan",
        "name": "Büyükorhan",
        "slug": "buyukorhan",
        "neighborhoods": []
      },
      {
        "id": "16_gemlik",
        "name": "Gemlik",
        "slug": "gemlik",
        "neighborhoods": []
      },
      {
        "id": "16_gursu",
        "name": "Gürsu",
        "slug": "gursu",
        "neighborhoods": []
      },
      {
        "id": "16_harmancik",
        "name": "Harmancık",
        "slug": "harmancik",
        "neighborhoods": []
      },
      {
        "id": "16_i-negol",
        "name": "İnegöl",
        "slug": "i-negol",
        "neighborhoods": []
      },
      {
        "id": "16_i-znik",
        "name": "İznik",
        "slug": "i-znik",
        "neighborhoods": []
      },
      {
        "id": "16_karacabey",
        "name": "Karacabey",
        "slug": "karacabey",
        "neighborhoods": []
      },
      {
        "id": "16_keles",
        "name": "Keles",
        "slug": "keles",
        "neighborhoods": []
      },
      {
        "id": "16_kestel",
        "name": "Kestel",
        "slug": "kestel",
        "neighborhoods": []
      },
      {
        "id": "16_mudanya",
        "name": "Mudanya",
        "slug": "mudanya",
        "neighborhoods": []
      },
      {
        "id": "16_mustafakemalpasa",
        "name": "Mustafakemalpaşa",
        "slug": "mustafakemalpasa",
        "neighborhoods": []
      },
      {
        "id": "16_nilufer",
        "name": "Nilüfer",
        "slug": "nilufer",
        "neighborhoods": []
      },
      {
        "id": "16_orhaneli",
        "name": "Orhaneli",
        "slug": "orhaneli",
        "neighborhoods": []
      },
      {
        "id": "16_orhangazi",
        "name": "Orhangazi",
        "slug": "orhangazi",
        "neighborhoods": []
      },
      {
        "id": "16_osmangazi",
        "name": "Osmangazi",
        "slug": "osmangazi",
        "neighborhoods": []
      },
      {
        "id": "16_yenisehir",
        "name": "Yenişehir",
        "slug": "yenisehir",
        "neighborhoods": []
      },
      {
        "id": "16_yildirim",
        "name": "Yıldırım",
        "slug": "yildirim",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "17",
    "name": "Çanakkale",
    "slug": "canakkale",
    "districts": [
      {
        "id": "17_ayvacik",
        "name": "Ayvacık",
        "slug": "ayvacik",
        "neighborhoods": []
      },
      {
        "id": "17_bayramic",
        "name": "Bayramiç",
        "slug": "bayramic",
        "neighborhoods": []
      },
      {
        "id": "17_biga",
        "name": "Biga",
        "slug": "biga",
        "neighborhoods": []
      },
      {
        "id": "17_bozcaada",
        "name": "Bozcaada",
        "slug": "bozcaada",
        "neighborhoods": []
      },
      {
        "id": "17_can",
        "name": "Çan",
        "slug": "can",
        "neighborhoods": []
      },
      {
        "id": "17_eceabat",
        "name": "Eceabat",
        "slug": "eceabat",
        "neighborhoods": []
      },
      {
        "id": "17_ezine",
        "name": "Ezine",
        "slug": "ezine",
        "neighborhoods": []
      },
      {
        "id": "17_gelibolu",
        "name": "Gelibolu",
        "slug": "gelibolu",
        "neighborhoods": []
      },
      {
        "id": "17_gokceada",
        "name": "Gökçeada",
        "slug": "gokceada",
        "neighborhoods": []
      },
      {
        "id": "17_lapseki",
        "name": "Lapseki",
        "slug": "lapseki",
        "neighborhoods": []
      },
      {
        "id": "17_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "17_yenice",
        "name": "Yenice",
        "slug": "yenice",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "18",
    "name": "Çankırı",
    "slug": "cankiri",
    "districts": [
      {
        "id": "18_atkaracalar",
        "name": "Atkaracalar",
        "slug": "atkaracalar",
        "neighborhoods": []
      },
      {
        "id": "18_bayramoren",
        "name": "Bayramören",
        "slug": "bayramoren",
        "neighborhoods": []
      },
      {
        "id": "18_cerkes",
        "name": "Çerkeş",
        "slug": "cerkes",
        "neighborhoods": []
      },
      {
        "id": "18_eldivan",
        "name": "Eldivan",
        "slug": "eldivan",
        "neighborhoods": []
      },
      {
        "id": "18_ilgaz",
        "name": "Ilgaz",
        "slug": "ilgaz",
        "neighborhoods": []
      },
      {
        "id": "18_kizilirmak",
        "name": "Kızılırmak",
        "slug": "kizilirmak",
        "neighborhoods": []
      },
      {
        "id": "18_korgun",
        "name": "Korgun",
        "slug": "korgun",
        "neighborhoods": []
      },
      {
        "id": "18_kursunlu",
        "name": "Kurşunlu",
        "slug": "kursunlu",
        "neighborhoods": []
      },
      {
        "id": "18_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "18_orta",
        "name": "Orta",
        "slug": "orta",
        "neighborhoods": []
      },
      {
        "id": "18_sabanozu",
        "name": "Şabanözü",
        "slug": "sabanozu",
        "neighborhoods": []
      },
      {
        "id": "18_yaprakli",
        "name": "Yapraklı",
        "slug": "yaprakli",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "19",
    "name": "Çorum",
    "slug": "corum",
    "districts": [
      {
        "id": "19_alaca",
        "name": "Alaca",
        "slug": "alaca",
        "neighborhoods": []
      },
      {
        "id": "19_bayat",
        "name": "Bayat",
        "slug": "bayat",
        "neighborhoods": []
      },
      {
        "id": "19_bogazkale",
        "name": "Boğazkale",
        "slug": "bogazkale",
        "neighborhoods": []
      },
      {
        "id": "19_dodurga",
        "name": "Dodurga",
        "slug": "dodurga",
        "neighborhoods": []
      },
      {
        "id": "19_i-skilip",
        "name": "İskilip",
        "slug": "i-skilip",
        "neighborhoods": []
      },
      {
        "id": "19_kargi",
        "name": "Kargı",
        "slug": "kargi",
        "neighborhoods": []
      },
      {
        "id": "19_lacin",
        "name": "Laçin",
        "slug": "lacin",
        "neighborhoods": []
      },
      {
        "id": "19_mecitozu",
        "name": "Mecitözü",
        "slug": "mecitozu",
        "neighborhoods": []
      },
      {
        "id": "19_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "19_oguzlar",
        "name": "Oğuzlar",
        "slug": "oguzlar",
        "neighborhoods": []
      },
      {
        "id": "19_ortakoy",
        "name": "Ortaköy",
        "slug": "ortakoy",
        "neighborhoods": []
      },
      {
        "id": "19_osmancik",
        "name": "Osmancık",
        "slug": "osmancik",
        "neighborhoods": []
      },
      {
        "id": "19_sungurlu",
        "name": "Sungurlu",
        "slug": "sungurlu",
        "neighborhoods": []
      },
      {
        "id": "19_ugurludag",
        "name": "Uğurludağ",
        "slug": "ugurludag",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "20",
    "name": "Denizli",
    "slug": "denizli",
    "districts": [
      {
        "id": "20_acipayam",
        "name": "Acıpayam",
        "slug": "acipayam",
        "neighborhoods": []
      },
      {
        "id": "20_babadag",
        "name": "Babadağ",
        "slug": "babadag",
        "neighborhoods": []
      },
      {
        "id": "20_baklan",
        "name": "Baklan",
        "slug": "baklan",
        "neighborhoods": []
      },
      {
        "id": "20_bekilli",
        "name": "Bekilli",
        "slug": "bekilli",
        "neighborhoods": []
      },
      {
        "id": "20_beyagac",
        "name": "Beyağaç",
        "slug": "beyagac",
        "neighborhoods": []
      },
      {
        "id": "20_bozkurt",
        "name": "Bozkurt",
        "slug": "bozkurt",
        "neighborhoods": []
      },
      {
        "id": "20_buldan",
        "name": "Buldan",
        "slug": "buldan",
        "neighborhoods": []
      },
      {
        "id": "20_cal",
        "name": "Çal",
        "slug": "cal",
        "neighborhoods": []
      },
      {
        "id": "20_cameli",
        "name": "Çameli",
        "slug": "cameli",
        "neighborhoods": []
      },
      {
        "id": "20_cardak",
        "name": "Çardak",
        "slug": "cardak",
        "neighborhoods": []
      },
      {
        "id": "20_civril",
        "name": "Çivril",
        "slug": "civril",
        "neighborhoods": []
      },
      {
        "id": "20_guney",
        "name": "Güney",
        "slug": "guney",
        "neighborhoods": []
      },
      {
        "id": "20_honaz",
        "name": "Honaz",
        "slug": "honaz",
        "neighborhoods": []
      },
      {
        "id": "20_kale",
        "name": "Kale",
        "slug": "kale",
        "neighborhoods": []
      },
      {
        "id": "20_merkezefendi",
        "name": "Merkezefendi",
        "slug": "merkezefendi",
        "neighborhoods": []
      },
      {
        "id": "20_pamukkale",
        "name": "Pamukkale",
        "slug": "pamukkale",
        "neighborhoods": []
      },
      {
        "id": "20_saraykoy",
        "name": "Sarayköy",
        "slug": "saraykoy",
        "neighborhoods": []
      },
      {
        "id": "20_serinhisar",
        "name": "Serinhisar",
        "slug": "serinhisar",
        "neighborhoods": []
      },
      {
        "id": "20_tavas",
        "name": "Tavas",
        "slug": "tavas",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "21",
    "name": "Diyarbakır",
    "slug": "diyarbakir",
    "districts": [
      {
        "id": "21_baglar",
        "name": "Bağlar",
        "slug": "baglar",
        "neighborhoods": []
      },
      {
        "id": "21_bismil",
        "name": "Bismil",
        "slug": "bismil",
        "neighborhoods": []
      },
      {
        "id": "21_cermik",
        "name": "Çermik",
        "slug": "cermik",
        "neighborhoods": []
      },
      {
        "id": "21_cinar",
        "name": "Çınar",
        "slug": "cinar",
        "neighborhoods": []
      },
      {
        "id": "21_cungus",
        "name": "Çüngüş",
        "slug": "cungus",
        "neighborhoods": []
      },
      {
        "id": "21_dicle",
        "name": "Dicle",
        "slug": "dicle",
        "neighborhoods": []
      },
      {
        "id": "21_egil",
        "name": "Eğil",
        "slug": "egil",
        "neighborhoods": []
      },
      {
        "id": "21_ergani",
        "name": "Ergani",
        "slug": "ergani",
        "neighborhoods": []
      },
      {
        "id": "21_hani",
        "name": "Hani",
        "slug": "hani",
        "neighborhoods": []
      },
      {
        "id": "21_hazro",
        "name": "Hazro",
        "slug": "hazro",
        "neighborhoods": []
      },
      {
        "id": "21_kayapinar",
        "name": "Kayapınar",
        "slug": "kayapinar",
        "neighborhoods": []
      },
      {
        "id": "21_kocakoy",
        "name": "Kocaköy",
        "slug": "kocakoy",
        "neighborhoods": []
      },
      {
        "id": "21_kulp",
        "name": "Kulp",
        "slug": "kulp",
        "neighborhoods": []
      },
      {
        "id": "21_lice",
        "name": "Lice",
        "slug": "lice",
        "neighborhoods": []
      },
      {
        "id": "21_silvan",
        "name": "Silvan",
        "slug": "silvan",
        "neighborhoods": []
      },
      {
        "id": "21_sur",
        "name": "Sur",
        "slug": "sur",
        "neighborhoods": []
      },
      {
        "id": "21_yenisehir",
        "name": "Yenişehir",
        "slug": "yenisehir",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "22",
    "name": "Edirne",
    "slug": "edirne",
    "districts": [
      {
        "id": "22_enez",
        "name": "Enez",
        "slug": "enez",
        "neighborhoods": []
      },
      {
        "id": "22_havsa",
        "name": "Havsa",
        "slug": "havsa",
        "neighborhoods": []
      },
      {
        "id": "22_i-psala",
        "name": "İpsala",
        "slug": "i-psala",
        "neighborhoods": []
      },
      {
        "id": "22_kesan",
        "name": "Keşan",
        "slug": "kesan",
        "neighborhoods": []
      },
      {
        "id": "22_lalapasa",
        "name": "Lalapaşa",
        "slug": "lalapasa",
        "neighborhoods": []
      },
      {
        "id": "22_meric",
        "name": "Meriç",
        "slug": "meric",
        "neighborhoods": []
      },
      {
        "id": "22_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "22_suloglu",
        "name": "Süloğlu",
        "slug": "suloglu",
        "neighborhoods": []
      },
      {
        "id": "22_uzunkopru",
        "name": "Uzunköprü",
        "slug": "uzunkopru",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "23",
    "name": "Elazığ",
    "slug": "elazig",
    "districts": [
      {
        "id": "23_agin",
        "name": "Ağın",
        "slug": "agin",
        "neighborhoods": []
      },
      {
        "id": "23_alacakaya",
        "name": "Alacakaya",
        "slug": "alacakaya",
        "neighborhoods": []
      },
      {
        "id": "23_aricak",
        "name": "Arıcak",
        "slug": "aricak",
        "neighborhoods": []
      },
      {
        "id": "23_baskil",
        "name": "Baskil",
        "slug": "baskil",
        "neighborhoods": []
      },
      {
        "id": "23_karakocan",
        "name": "Karakoçan",
        "slug": "karakocan",
        "neighborhoods": []
      },
      {
        "id": "23_keban",
        "name": "Keban",
        "slug": "keban",
        "neighborhoods": []
      },
      {
        "id": "23_kovancilar",
        "name": "Kovancılar",
        "slug": "kovancilar",
        "neighborhoods": []
      },
      {
        "id": "23_maden",
        "name": "Maden",
        "slug": "maden",
        "neighborhoods": []
      },
      {
        "id": "23_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "23_palu",
        "name": "Palu",
        "slug": "palu",
        "neighborhoods": []
      },
      {
        "id": "23_sivrice",
        "name": "Sivrice",
        "slug": "sivrice",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "24",
    "name": "Erzincan",
    "slug": "erzincan",
    "districts": [
      {
        "id": "24_cayirli",
        "name": "Çayırlı",
        "slug": "cayirli",
        "neighborhoods": []
      },
      {
        "id": "24_i-lic",
        "name": "İliç",
        "slug": "i-lic",
        "neighborhoods": []
      },
      {
        "id": "24_kemah",
        "name": "Kemah",
        "slug": "kemah",
        "neighborhoods": []
      },
      {
        "id": "24_kemaliye",
        "name": "Kemaliye",
        "slug": "kemaliye",
        "neighborhoods": []
      },
      {
        "id": "24_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "24_otlukbeli",
        "name": "Otlukbeli",
        "slug": "otlukbeli",
        "neighborhoods": []
      },
      {
        "id": "24_refahiye",
        "name": "Refahiye",
        "slug": "refahiye",
        "neighborhoods": []
      },
      {
        "id": "24_tercan",
        "name": "Tercan",
        "slug": "tercan",
        "neighborhoods": []
      },
      {
        "id": "24_uzumlu",
        "name": "Üzümlü",
        "slug": "uzumlu",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "25",
    "name": "Erzurum",
    "slug": "erzurum",
    "districts": [
      {
        "id": "25_askale",
        "name": "Aşkale",
        "slug": "askale",
        "neighborhoods": []
      },
      {
        "id": "25_aziziye",
        "name": "Aziziye",
        "slug": "aziziye",
        "neighborhoods": []
      },
      {
        "id": "25_cat",
        "name": "Çat",
        "slug": "cat",
        "neighborhoods": []
      },
      {
        "id": "25_hinis",
        "name": "Hınıs",
        "slug": "hinis",
        "neighborhoods": []
      },
      {
        "id": "25_horasan",
        "name": "Horasan",
        "slug": "horasan",
        "neighborhoods": []
      },
      {
        "id": "25_i-spir",
        "name": "İspir",
        "slug": "i-spir",
        "neighborhoods": []
      },
      {
        "id": "25_karacoban",
        "name": "Karaçoban",
        "slug": "karacoban",
        "neighborhoods": []
      },
      {
        "id": "25_karayazi",
        "name": "Karayazı",
        "slug": "karayazi",
        "neighborhoods": []
      },
      {
        "id": "25_koprukoy",
        "name": "Köprüköy",
        "slug": "koprukoy",
        "neighborhoods": []
      },
      {
        "id": "25_narman",
        "name": "Narman",
        "slug": "narman",
        "neighborhoods": []
      },
      {
        "id": "25_oltu",
        "name": "Oltu",
        "slug": "oltu",
        "neighborhoods": []
      },
      {
        "id": "25_olur",
        "name": "Olur",
        "slug": "olur",
        "neighborhoods": []
      },
      {
        "id": "25_palandoken",
        "name": "Palandöken",
        "slug": "palandoken",
        "neighborhoods": []
      },
      {
        "id": "25_pasinler",
        "name": "Pasinler",
        "slug": "pasinler",
        "neighborhoods": []
      },
      {
        "id": "25_pazaryolu",
        "name": "Pazaryolu",
        "slug": "pazaryolu",
        "neighborhoods": []
      },
      {
        "id": "25_senkaya",
        "name": "Şenkaya",
        "slug": "senkaya",
        "neighborhoods": []
      },
      {
        "id": "25_tekman",
        "name": "Tekman",
        "slug": "tekman",
        "neighborhoods": []
      },
      {
        "id": "25_tortum",
        "name": "Tortum",
        "slug": "tortum",
        "neighborhoods": []
      },
      {
        "id": "25_uzundere",
        "name": "Uzundere",
        "slug": "uzundere",
        "neighborhoods": []
      },
      {
        "id": "25_yakutiye",
        "name": "Yakutiye",
        "slug": "yakutiye",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "26",
    "name": "Eskişehir",
    "slug": "eskisehir",
    "districts": [
      {
        "id": "26_alpu",
        "name": "Alpu",
        "slug": "alpu",
        "neighborhoods": []
      },
      {
        "id": "26_beylikova",
        "name": "Beylikova",
        "slug": "beylikova",
        "neighborhoods": []
      },
      {
        "id": "26_cifteler",
        "name": "Çifteler",
        "slug": "cifteler",
        "neighborhoods": []
      },
      {
        "id": "26_gunyuzu",
        "name": "Günyüzü",
        "slug": "gunyuzu",
        "neighborhoods": []
      },
      {
        "id": "26_han",
        "name": "Han",
        "slug": "han",
        "neighborhoods": []
      },
      {
        "id": "26_i-nonu",
        "name": "İnönü",
        "slug": "i-nonu",
        "neighborhoods": []
      },
      {
        "id": "26_mahmudiye",
        "name": "Mahmudiye",
        "slug": "mahmudiye",
        "neighborhoods": []
      },
      {
        "id": "26_mihalgazi",
        "name": "Mihalgazi",
        "slug": "mihalgazi",
        "neighborhoods": []
      },
      {
        "id": "26_mihaliccik",
        "name": "Mihalıççık",
        "slug": "mihaliccik",
        "neighborhoods": []
      },
      {
        "id": "26_odunpazari",
        "name": "Odunpazarı",
        "slug": "odunpazari",
        "neighborhoods": []
      },
      {
        "id": "26_saricakaya",
        "name": "Sarıcakaya",
        "slug": "saricakaya",
        "neighborhoods": []
      },
      {
        "id": "26_seyitgazi",
        "name": "Seyitgazi",
        "slug": "seyitgazi",
        "neighborhoods": []
      },
      {
        "id": "26_sivrihisar",
        "name": "Sivrihisar",
        "slug": "sivrihisar",
        "neighborhoods": []
      },
      {
        "id": "26_tepebasi",
        "name": "Tepebaşı",
        "slug": "tepebasi",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "27",
    "name": "Gaziantep",
    "slug": "gaziantep",
    "districts": [
      {
        "id": "27_araban",
        "name": "Araban",
        "slug": "araban",
        "neighborhoods": []
      },
      {
        "id": "27_i-slahiye",
        "name": "İslahiye",
        "slug": "i-slahiye",
        "neighborhoods": []
      },
      {
        "id": "27_karkamis",
        "name": "Karkamış",
        "slug": "karkamis",
        "neighborhoods": []
      },
      {
        "id": "27_nizip",
        "name": "Nizip",
        "slug": "nizip",
        "neighborhoods": []
      },
      {
        "id": "27_nurdagi",
        "name": "Nurdağı",
        "slug": "nurdagi",
        "neighborhoods": []
      },
      {
        "id": "27_oguzeli",
        "name": "Oğuzeli",
        "slug": "oguzeli",
        "neighborhoods": []
      },
      {
        "id": "27_sahinbey",
        "name": "Şahinbey",
        "slug": "sahinbey",
        "neighborhoods": []
      },
      {
        "id": "27_sehitkamil",
        "name": "Şehitkamil",
        "slug": "sehitkamil",
        "neighborhoods": []
      },
      {
        "id": "27_yavuzeli",
        "name": "Yavuzeli",
        "slug": "yavuzeli",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "28",
    "name": "Giresun",
    "slug": "giresun",
    "districts": [
      {
        "id": "28_alucra",
        "name": "Alucra",
        "slug": "alucra",
        "neighborhoods": []
      },
      {
        "id": "28_bulancak",
        "name": "Bulancak",
        "slug": "bulancak",
        "neighborhoods": []
      },
      {
        "id": "28_camoluk",
        "name": "Çamoluk",
        "slug": "camoluk",
        "neighborhoods": []
      },
      {
        "id": "28_canakci",
        "name": "Çanakçı",
        "slug": "canakci",
        "neighborhoods": []
      },
      {
        "id": "28_dereli",
        "name": "Dereli",
        "slug": "dereli",
        "neighborhoods": []
      },
      {
        "id": "28_dogankent",
        "name": "Doğankent",
        "slug": "dogankent",
        "neighborhoods": []
      },
      {
        "id": "28_espiye",
        "name": "Espiye",
        "slug": "espiye",
        "neighborhoods": []
      },
      {
        "id": "28_eynesil",
        "name": "Eynesil",
        "slug": "eynesil",
        "neighborhoods": []
      },
      {
        "id": "28_gorele",
        "name": "Görele",
        "slug": "gorele",
        "neighborhoods": []
      },
      {
        "id": "28_guce",
        "name": "Güce",
        "slug": "guce",
        "neighborhoods": []
      },
      {
        "id": "28_kesap",
        "name": "Keşap",
        "slug": "kesap",
        "neighborhoods": []
      },
      {
        "id": "28_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "28_piraziz",
        "name": "Piraziz",
        "slug": "piraziz",
        "neighborhoods": []
      },
      {
        "id": "28_sebinkarahisar",
        "name": "Şebinkarahisar",
        "slug": "sebinkarahisar",
        "neighborhoods": []
      },
      {
        "id": "28_tirebolu",
        "name": "Tirebolu",
        "slug": "tirebolu",
        "neighborhoods": []
      },
      {
        "id": "28_yaglidere",
        "name": "Yağlıdere",
        "slug": "yaglidere",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "29",
    "name": "Gümüşhane",
    "slug": "gumushane",
    "districts": [
      {
        "id": "29_kelkit",
        "name": "Kelkit",
        "slug": "kelkit",
        "neighborhoods": []
      },
      {
        "id": "29_kose",
        "name": "Köse",
        "slug": "kose",
        "neighborhoods": []
      },
      {
        "id": "29_kurtun",
        "name": "Kürtün",
        "slug": "kurtun",
        "neighborhoods": []
      },
      {
        "id": "29_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "29_siran",
        "name": "Şiran",
        "slug": "siran",
        "neighborhoods": []
      },
      {
        "id": "29_torul",
        "name": "Torul",
        "slug": "torul",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "30",
    "name": "Hakkari",
    "slug": "hakkari",
    "districts": [
      {
        "id": "30_cukurca",
        "name": "Çukurca",
        "slug": "cukurca",
        "neighborhoods": []
      },
      {
        "id": "30_derecik",
        "name": "Derecik",
        "slug": "derecik",
        "neighborhoods": []
      },
      {
        "id": "30_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "30_semdinli",
        "name": "Şemdinli",
        "slug": "semdinli",
        "neighborhoods": []
      },
      {
        "id": "30_yuksekova",
        "name": "Yüksekova",
        "slug": "yuksekova",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "31",
    "name": "Hatay",
    "slug": "hatay",
    "districts": [
      {
        "id": "31_altinozu",
        "name": "Altınözü",
        "slug": "altinozu",
        "neighborhoods": []
      },
      {
        "id": "31_antakya",
        "name": "Antakya",
        "slug": "antakya",
        "neighborhoods": []
      },
      {
        "id": "31_arsuz",
        "name": "Arsuz",
        "slug": "arsuz",
        "neighborhoods": []
      },
      {
        "id": "31_belen",
        "name": "Belen",
        "slug": "belen",
        "neighborhoods": []
      },
      {
        "id": "31_defne",
        "name": "Defne",
        "slug": "defne",
        "neighborhoods": []
      },
      {
        "id": "31_dortyol",
        "name": "Dörtyol",
        "slug": "dortyol",
        "neighborhoods": []
      },
      {
        "id": "31_erzin",
        "name": "Erzin",
        "slug": "erzin",
        "neighborhoods": []
      },
      {
        "id": "31_hassa",
        "name": "Hassa",
        "slug": "hassa",
        "neighborhoods": []
      },
      {
        "id": "31_i-skenderun",
        "name": "İskenderun",
        "slug": "i-skenderun",
        "neighborhoods": []
      },
      {
        "id": "31_kirikhan",
        "name": "Kırıkhan",
        "slug": "kirikhan",
        "neighborhoods": []
      },
      {
        "id": "31_kumlu",
        "name": "Kumlu",
        "slug": "kumlu",
        "neighborhoods": []
      },
      {
        "id": "31_payas",
        "name": "Payas",
        "slug": "payas",
        "neighborhoods": []
      },
      {
        "id": "31_reyhanli",
        "name": "Reyhanlı",
        "slug": "reyhanli",
        "neighborhoods": []
      },
      {
        "id": "31_samandag",
        "name": "Samandağ",
        "slug": "samandag",
        "neighborhoods": []
      },
      {
        "id": "31_yayladagi",
        "name": "Yayladağı",
        "slug": "yayladagi",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "32",
    "name": "Isparta",
    "slug": "isparta",
    "districts": [
      {
        "id": "32_aksu",
        "name": "Aksu",
        "slug": "aksu",
        "neighborhoods": []
      },
      {
        "id": "32_atabey",
        "name": "Atabey",
        "slug": "atabey",
        "neighborhoods": []
      },
      {
        "id": "32_egirdir",
        "name": "Eğirdir",
        "slug": "egirdir",
        "neighborhoods": []
      },
      {
        "id": "32_gelendost",
        "name": "Gelendost",
        "slug": "gelendost",
        "neighborhoods": []
      },
      {
        "id": "32_gonen",
        "name": "Gönen",
        "slug": "gonen",
        "neighborhoods": []
      },
      {
        "id": "32_keciborlu",
        "name": "Keçiborlu",
        "slug": "keciborlu",
        "neighborhoods": []
      },
      {
        "id": "32_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "32_senirkent",
        "name": "Senirkent",
        "slug": "senirkent",
        "neighborhoods": []
      },
      {
        "id": "32_sutculer",
        "name": "Sütçüler",
        "slug": "sutculer",
        "neighborhoods": []
      },
      {
        "id": "32_sarkikaraagac",
        "name": "Şarkikaraağaç",
        "slug": "sarkikaraagac",
        "neighborhoods": []
      },
      {
        "id": "32_uluborlu",
        "name": "Uluborlu",
        "slug": "uluborlu",
        "neighborhoods": []
      },
      {
        "id": "32_yalvac",
        "name": "Yalvaç",
        "slug": "yalvac",
        "neighborhoods": []
      },
      {
        "id": "32_yenisarbademli",
        "name": "Yenişarbademli",
        "slug": "yenisarbademli",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "33",
    "name": "Mersin",
    "slug": "mersin",
    "districts": [
      {
        "id": "33_akdeniz",
        "name": "Akdeniz",
        "slug": "akdeniz",
        "neighborhoods": []
      },
      {
        "id": "33_anamur",
        "name": "Anamur",
        "slug": "anamur",
        "neighborhoods": []
      },
      {
        "id": "33_aydincik",
        "name": "Aydıncık",
        "slug": "aydincik",
        "neighborhoods": []
      },
      {
        "id": "33_bozyazi",
        "name": "Bozyazı",
        "slug": "bozyazi",
        "neighborhoods": []
      },
      {
        "id": "33_camliyayla",
        "name": "Çamlıyayla",
        "slug": "camliyayla",
        "neighborhoods": []
      },
      {
        "id": "33_erdemli",
        "name": "Erdemli",
        "slug": "erdemli",
        "neighborhoods": []
      },
      {
        "id": "33_gulnar",
        "name": "Gülnar",
        "slug": "gulnar",
        "neighborhoods": []
      },
      {
        "id": "33_mezitli",
        "name": "Mezitli",
        "slug": "mezitli",
        "neighborhoods": []
      },
      {
        "id": "33_mut",
        "name": "Mut",
        "slug": "mut",
        "neighborhoods": []
      },
      {
        "id": "33_silifke",
        "name": "Silifke",
        "slug": "silifke",
        "neighborhoods": []
      },
      {
        "id": "33_tarsus",
        "name": "Tarsus",
        "slug": "tarsus",
        "neighborhoods": []
      },
      {
        "id": "33_toroslar",
        "name": "Toroslar",
        "slug": "toroslar",
        "neighborhoods": []
      },
      {
        "id": "33_yenisehir",
        "name": "Yenişehir",
        "slug": "yenisehir",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "34",
    "name": "İstanbul",
    "slug": "i-stanbul",
    "districts": [
      {
        "id": "34_adalar",
        "name": "Adalar",
        "slug": "adalar",
        "neighborhoods": []
      },
      {
        "id": "34_arnavutkoy",
        "name": "Arnavutköy",
        "slug": "arnavutkoy",
        "neighborhoods": []
      },
      {
        "id": "34_atasehir",
        "name": "Ataşehir",
        "slug": "atasehir",
        "neighborhoods": []
      },
      {
        "id": "34_avcilar",
        "name": "Avcılar",
        "slug": "avcilar",
        "neighborhoods": []
      },
      {
        "id": "34_bagcilar",
        "name": "Bağcılar",
        "slug": "bagcilar",
        "neighborhoods": []
      },
      {
        "id": "34_bahcelievler",
        "name": "Bahçelievler",
        "slug": "bahcelievler",
        "neighborhoods": []
      },
      {
        "id": "34_bakirkoy",
        "name": "Bakırköy",
        "slug": "bakirkoy",
        "neighborhoods": []
      },
      {
        "id": "34_basaksehir",
        "name": "Başakşehir",
        "slug": "basaksehir",
        "neighborhoods": []
      },
      {
        "id": "34_bayrampasa",
        "name": "Bayrampaşa",
        "slug": "bayrampasa",
        "neighborhoods": []
      },
      {
        "id": "34_besiktas",
        "name": "Beşiktaş",
        "slug": "besiktas",
        "neighborhoods": []
      },
      {
        "id": "34_beykoz",
        "name": "Beykoz",
        "slug": "beykoz",
        "neighborhoods": []
      },
      {
        "id": "34_beylikduzu",
        "name": "Beylikdüzü",
        "slug": "beylikduzu",
        "neighborhoods": []
      },
      {
        "id": "34_beyoglu",
        "name": "Beyoğlu",
        "slug": "beyoglu",
        "neighborhoods": []
      },
      {
        "id": "34_buyukcekmece",
        "name": "Büyükçekmece",
        "slug": "buyukcekmece",
        "neighborhoods": []
      },
      {
        "id": "34_catalca",
        "name": "Çatalca",
        "slug": "catalca",
        "neighborhoods": []
      },
      {
        "id": "34_cekmekoy",
        "name": "Çekmeköy",
        "slug": "cekmekoy",
        "neighborhoods": []
      },
      {
        "id": "34_esenler",
        "name": "Esenler",
        "slug": "esenler",
        "neighborhoods": []
      },
      {
        "id": "34_esenyurt",
        "name": "Esenyurt",
        "slug": "esenyurt",
        "neighborhoods": []
      },
      {
        "id": "34_eyupsultan",
        "name": "Eyüpsultan",
        "slug": "eyupsultan",
        "neighborhoods": []
      },
      {
        "id": "34_fatih",
        "name": "Fatih",
        "slug": "fatih",
        "neighborhoods": []
      },
      {
        "id": "34_gaziosmanpasa",
        "name": "Gaziosmanpaşa",
        "slug": "gaziosmanpasa",
        "neighborhoods": []
      },
      {
        "id": "34_gungoren",
        "name": "Güngören",
        "slug": "gungoren",
        "neighborhoods": []
      },
      {
        "id": "34_kadikoy",
        "name": "Kadıköy",
        "slug": "kadikoy",
        "neighborhoods": []
      },
      {
        "id": "34_kagithane",
        "name": "Kağıthane",
        "slug": "kagithane",
        "neighborhoods": []
      },
      {
        "id": "34_kartal",
        "name": "Kartal",
        "slug": "kartal",
        "neighborhoods": []
      },
      {
        "id": "34_kucukcekmece",
        "name": "Küçükçekmece",
        "slug": "kucukcekmece",
        "neighborhoods": []
      },
      {
        "id": "34_maltepe",
        "name": "Maltepe",
        "slug": "maltepe",
        "neighborhoods": []
      },
      {
        "id": "34_pendik",
        "name": "Pendik",
        "slug": "pendik",
        "neighborhoods": []
      },
      {
        "id": "34_sancaktepe",
        "name": "Sancaktepe",
        "slug": "sancaktepe",
        "neighborhoods": []
      },
      {
        "id": "34_sariyer",
        "name": "Sarıyer",
        "slug": "sariyer",
        "neighborhoods": []
      },
      {
        "id": "34_silivri",
        "name": "Silivri",
        "slug": "silivri",
        "neighborhoods": []
      },
      {
        "id": "34_sultanbeyli",
        "name": "Sultanbeyli",
        "slug": "sultanbeyli",
        "neighborhoods": []
      },
      {
        "id": "34_sultangazi",
        "name": "Sultangazi",
        "slug": "sultangazi",
        "neighborhoods": []
      },
      {
        "id": "34_sile",
        "name": "Şile",
        "slug": "sile",
        "neighborhoods": []
      },
      {
        "id": "34_sisli",
        "name": "Şişli",
        "slug": "sisli",
        "neighborhoods": []
      },
      {
        "id": "34_tuzla",
        "name": "Tuzla",
        "slug": "tuzla",
        "neighborhoods": []
      },
      {
        "id": "34_umraniye",
        "name": "Ümraniye",
        "slug": "umraniye",
        "neighborhoods": []
      },
      {
        "id": "34_uskudar",
        "name": "Üsküdar",
        "slug": "uskudar",
        "neighborhoods": []
      },
      {
        "id": "34_zeytinburnu",
        "name": "Zeytinburnu",
        "slug": "zeytinburnu",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "35",
    "name": "İzmir",
    "slug": "i-zmir",
    "districts": [
      {
        "id": "35_aliaga",
        "name": "Aliağa",
        "slug": "aliaga",
        "neighborhoods": []
      },
      {
        "id": "35_balcova",
        "name": "Balçova",
        "slug": "balcova",
        "neighborhoods": []
      },
      {
        "id": "35_bayindir",
        "name": "Bayındır",
        "slug": "bayindir",
        "neighborhoods": []
      },
      {
        "id": "35_bayrakli",
        "name": "Bayraklı",
        "slug": "bayrakli",
        "neighborhoods": []
      },
      {
        "id": "35_bergama",
        "name": "Bergama",
        "slug": "bergama",
        "neighborhoods": []
      },
      {
        "id": "35_beydag",
        "name": "Beydağ",
        "slug": "beydag",
        "neighborhoods": []
      },
      {
        "id": "35_bornova",
        "name": "Bornova",
        "slug": "bornova",
        "neighborhoods": []
      },
      {
        "id": "35_buca",
        "name": "Buca",
        "slug": "buca",
        "neighborhoods": []
      },
      {
        "id": "35_cesme",
        "name": "Çeşme",
        "slug": "cesme",
        "neighborhoods": []
      },
      {
        "id": "35_cigli",
        "name": "Çiğli",
        "slug": "cigli",
        "neighborhoods": []
      },
      {
        "id": "35_dikili",
        "name": "Dikili",
        "slug": "dikili",
        "neighborhoods": []
      },
      {
        "id": "35_foca",
        "name": "Foça",
        "slug": "foca",
        "neighborhoods": []
      },
      {
        "id": "35_gaziemir",
        "name": "Gaziemir",
        "slug": "gaziemir",
        "neighborhoods": []
      },
      {
        "id": "35_guzelbahce",
        "name": "Güzelbahçe",
        "slug": "guzelbahce",
        "neighborhoods": []
      },
      {
        "id": "35_karabaglar",
        "name": "Karabağlar",
        "slug": "karabaglar",
        "neighborhoods": []
      },
      {
        "id": "35_karaburun",
        "name": "Karaburun",
        "slug": "karaburun",
        "neighborhoods": []
      },
      {
        "id": "35_karsiyaka",
        "name": "Karşıyaka",
        "slug": "karsiyaka",
        "neighborhoods": []
      },
      {
        "id": "35_kemalpasa",
        "name": "Kemalpaşa",
        "slug": "kemalpasa",
        "neighborhoods": []
      },
      {
        "id": "35_kinik",
        "name": "Kınık",
        "slug": "kinik",
        "neighborhoods": []
      },
      {
        "id": "35_kiraz",
        "name": "Kiraz",
        "slug": "kiraz",
        "neighborhoods": []
      },
      {
        "id": "35_konak",
        "name": "Konak",
        "slug": "konak",
        "neighborhoods": []
      },
      {
        "id": "35_menderes",
        "name": "Menderes",
        "slug": "menderes",
        "neighborhoods": []
      },
      {
        "id": "35_menemen",
        "name": "Menemen",
        "slug": "menemen",
        "neighborhoods": []
      },
      {
        "id": "35_narlidere",
        "name": "Narlıdere",
        "slug": "narlidere",
        "neighborhoods": []
      },
      {
        "id": "35_odemis",
        "name": "Ödemiş",
        "slug": "odemis",
        "neighborhoods": []
      },
      {
        "id": "35_seferihisar",
        "name": "Seferihisar",
        "slug": "seferihisar",
        "neighborhoods": []
      },
      {
        "id": "35_selcuk",
        "name": "Selçuk",
        "slug": "selcuk",
        "neighborhoods": []
      },
      {
        "id": "35_tire",
        "name": "Tire",
        "slug": "tire",
        "neighborhoods": []
      },
      {
        "id": "35_torbali",
        "name": "Torbalı",
        "slug": "torbali",
        "neighborhoods": []
      },
      {
        "id": "35_urla",
        "name": "Urla",
        "slug": "urla",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "36",
    "name": "Kars",
    "slug": "kars",
    "districts": [
      {
        "id": "36_akyaka",
        "name": "Akyaka",
        "slug": "akyaka",
        "neighborhoods": []
      },
      {
        "id": "36_arpacay",
        "name": "Arpaçay",
        "slug": "arpacay",
        "neighborhoods": []
      },
      {
        "id": "36_digor",
        "name": "Digor",
        "slug": "digor",
        "neighborhoods": []
      },
      {
        "id": "36_kagizman",
        "name": "Kağızman",
        "slug": "kagizman",
        "neighborhoods": []
      },
      {
        "id": "36_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "36_sarikamis",
        "name": "Sarıkamış",
        "slug": "sarikamis",
        "neighborhoods": []
      },
      {
        "id": "36_selim",
        "name": "Selim",
        "slug": "selim",
        "neighborhoods": []
      },
      {
        "id": "36_susuz",
        "name": "Susuz",
        "slug": "susuz",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "37",
    "name": "Kastamonu",
    "slug": "kastamonu",
    "districts": [
      {
        "id": "37_abana",
        "name": "Abana",
        "slug": "abana",
        "neighborhoods": []
      },
      {
        "id": "37_agli",
        "name": "Ağlı",
        "slug": "agli",
        "neighborhoods": []
      },
      {
        "id": "37_arac",
        "name": "Araç",
        "slug": "arac",
        "neighborhoods": []
      },
      {
        "id": "37_azdavay",
        "name": "Azdavay",
        "slug": "azdavay",
        "neighborhoods": []
      },
      {
        "id": "37_bozkurt",
        "name": "Bozkurt",
        "slug": "bozkurt",
        "neighborhoods": []
      },
      {
        "id": "37_cide",
        "name": "Cide",
        "slug": "cide",
        "neighborhoods": []
      },
      {
        "id": "37_catalzeytin",
        "name": "Çatalzeytin",
        "slug": "catalzeytin",
        "neighborhoods": []
      },
      {
        "id": "37_daday",
        "name": "Daday",
        "slug": "daday",
        "neighborhoods": []
      },
      {
        "id": "37_devrekani",
        "name": "Devrekani",
        "slug": "devrekani",
        "neighborhoods": []
      },
      {
        "id": "37_doganyurt",
        "name": "Doğanyurt",
        "slug": "doganyurt",
        "neighborhoods": []
      },
      {
        "id": "37_hanonu",
        "name": "Hanönü",
        "slug": "hanonu",
        "neighborhoods": []
      },
      {
        "id": "37_i-hsangazi",
        "name": "İhsangazi",
        "slug": "i-hsangazi",
        "neighborhoods": []
      },
      {
        "id": "37_i-nebolu",
        "name": "İnebolu",
        "slug": "i-nebolu",
        "neighborhoods": []
      },
      {
        "id": "37_kure",
        "name": "Küre",
        "slug": "kure",
        "neighborhoods": []
      },
      {
        "id": "37_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "37_pinarbasi",
        "name": "Pınarbaşı",
        "slug": "pinarbasi",
        "neighborhoods": []
      },
      {
        "id": "37_seydiler",
        "name": "Seydiler",
        "slug": "seydiler",
        "neighborhoods": []
      },
      {
        "id": "37_senpazar",
        "name": "Şenpazar",
        "slug": "senpazar",
        "neighborhoods": []
      },
      {
        "id": "37_taskopru",
        "name": "Taşköprü",
        "slug": "taskopru",
        "neighborhoods": []
      },
      {
        "id": "37_tosya",
        "name": "Tosya",
        "slug": "tosya",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "38",
    "name": "Kayseri",
    "slug": "kayseri",
    "districts": [
      {
        "id": "38_akkisla",
        "name": "Akkışla",
        "slug": "akkisla",
        "neighborhoods": []
      },
      {
        "id": "38_bunyan",
        "name": "Bünyan",
        "slug": "bunyan",
        "neighborhoods": []
      },
      {
        "id": "38_develi",
        "name": "Develi",
        "slug": "develi",
        "neighborhoods": []
      },
      {
        "id": "38_felahiye",
        "name": "Felahiye",
        "slug": "felahiye",
        "neighborhoods": []
      },
      {
        "id": "38_hacilar",
        "name": "Hacılar",
        "slug": "hacilar",
        "neighborhoods": []
      },
      {
        "id": "38_i-ncesu",
        "name": "İncesu",
        "slug": "i-ncesu",
        "neighborhoods": []
      },
      {
        "id": "38_kocasinan",
        "name": "Kocasinan",
        "slug": "kocasinan",
        "neighborhoods": []
      },
      {
        "id": "38_melikgazi",
        "name": "Melikgazi",
        "slug": "melikgazi",
        "neighborhoods": []
      },
      {
        "id": "38_ozvatan",
        "name": "Özvatan",
        "slug": "ozvatan",
        "neighborhoods": []
      },
      {
        "id": "38_pinarbasi",
        "name": "Pınarbaşı",
        "slug": "pinarbasi",
        "neighborhoods": []
      },
      {
        "id": "38_sarioglan",
        "name": "Sarıoğlan",
        "slug": "sarioglan",
        "neighborhoods": []
      },
      {
        "id": "38_sariz",
        "name": "Sarız",
        "slug": "sariz",
        "neighborhoods": []
      },
      {
        "id": "38_talas",
        "name": "Talas",
        "slug": "talas",
        "neighborhoods": []
      },
      {
        "id": "38_tomarza",
        "name": "Tomarza",
        "slug": "tomarza",
        "neighborhoods": []
      },
      {
        "id": "38_yahyali",
        "name": "Yahyalı",
        "slug": "yahyali",
        "neighborhoods": []
      },
      {
        "id": "38_yesilhisar",
        "name": "Yeşilhisar",
        "slug": "yesilhisar",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "39",
    "name": "Kırklareli",
    "slug": "kirklareli",
    "districts": [
      {
        "id": "39_babaeski",
        "name": "Babaeski",
        "slug": "babaeski",
        "neighborhoods": []
      },
      {
        "id": "39_demirkoy",
        "name": "Demirköy",
        "slug": "demirkoy",
        "neighborhoods": []
      },
      {
        "id": "39_kofcaz",
        "name": "Kofçaz",
        "slug": "kofcaz",
        "neighborhoods": []
      },
      {
        "id": "39_luleburgaz",
        "name": "Lüleburgaz",
        "slug": "luleburgaz",
        "neighborhoods": []
      },
      {
        "id": "39_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "39_pehlivankoy",
        "name": "Pehlivanköy",
        "slug": "pehlivankoy",
        "neighborhoods": []
      },
      {
        "id": "39_pinarhisar",
        "name": "Pınarhisar",
        "slug": "pinarhisar",
        "neighborhoods": []
      },
      {
        "id": "39_vize",
        "name": "Vize",
        "slug": "vize",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "40",
    "name": "Kırşehir",
    "slug": "kirsehir",
    "districts": [
      {
        "id": "40_akcakent",
        "name": "Akçakent",
        "slug": "akcakent",
        "neighborhoods": []
      },
      {
        "id": "40_akpinar",
        "name": "Akpınar",
        "slug": "akpinar",
        "neighborhoods": []
      },
      {
        "id": "40_boztepe",
        "name": "Boztepe",
        "slug": "boztepe",
        "neighborhoods": []
      },
      {
        "id": "40_cicekdagi",
        "name": "Çiçekdağı",
        "slug": "cicekdagi",
        "neighborhoods": []
      },
      {
        "id": "40_kaman",
        "name": "Kaman",
        "slug": "kaman",
        "neighborhoods": []
      },
      {
        "id": "40_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "40_mucur",
        "name": "Mucur",
        "slug": "mucur",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "41",
    "name": "Kocaeli",
    "slug": "kocaeli",
    "districts": [
      {
        "id": "41_basiskele",
        "name": "Başiskele",
        "slug": "basiskele",
        "neighborhoods": []
      },
      {
        "id": "41_cayirova",
        "name": "Çayırova",
        "slug": "cayirova",
        "neighborhoods": []
      },
      {
        "id": "41_darica",
        "name": "Darıca",
        "slug": "darica",
        "neighborhoods": []
      },
      {
        "id": "41_derince",
        "name": "Derince",
        "slug": "derince",
        "neighborhoods": []
      },
      {
        "id": "41_dilovasi",
        "name": "Dilovası",
        "slug": "dilovasi",
        "neighborhoods": []
      },
      {
        "id": "41_gebze",
        "name": "Gebze",
        "slug": "gebze",
        "neighborhoods": []
      },
      {
        "id": "41_golcuk",
        "name": "Gölcük",
        "slug": "golcuk",
        "neighborhoods": []
      },
      {
        "id": "41_i-zmit",
        "name": "İzmit",
        "slug": "i-zmit",
        "neighborhoods": []
      },
      {
        "id": "41_kandira",
        "name": "Kandıra",
        "slug": "kandira",
        "neighborhoods": []
      },
      {
        "id": "41_karamursel",
        "name": "Karamürsel",
        "slug": "karamursel",
        "neighborhoods": []
      },
      {
        "id": "41_kartepe",
        "name": "Kartepe",
        "slug": "kartepe",
        "neighborhoods": []
      },
      {
        "id": "41_korfez",
        "name": "Körfez",
        "slug": "korfez",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "42",
    "name": "Konya",
    "slug": "konya",
    "districts": [
      {
        "id": "42_ahirli",
        "name": "Ahırlı",
        "slug": "ahirli",
        "neighborhoods": []
      },
      {
        "id": "42_akoren",
        "name": "Akören",
        "slug": "akoren",
        "neighborhoods": []
      },
      {
        "id": "42_aksehir",
        "name": "Akşehir",
        "slug": "aksehir",
        "neighborhoods": []
      },
      {
        "id": "42_altinekin",
        "name": "Altınekin",
        "slug": "altinekin",
        "neighborhoods": []
      },
      {
        "id": "42_beysehir",
        "name": "Beyşehir",
        "slug": "beysehir",
        "neighborhoods": []
      },
      {
        "id": "42_bozkir",
        "name": "Bozkır",
        "slug": "bozkir",
        "neighborhoods": []
      },
      {
        "id": "42_cihanbeyli",
        "name": "Cihanbeyli",
        "slug": "cihanbeyli",
        "neighborhoods": []
      },
      {
        "id": "42_celtik",
        "name": "Çeltik",
        "slug": "celtik",
        "neighborhoods": []
      },
      {
        "id": "42_cumra",
        "name": "Çumra",
        "slug": "cumra",
        "neighborhoods": []
      },
      {
        "id": "42_derbent",
        "name": "Derbent",
        "slug": "derbent",
        "neighborhoods": []
      },
      {
        "id": "42_derebucak",
        "name": "Derebucak",
        "slug": "derebucak",
        "neighborhoods": []
      },
      {
        "id": "42_doganhisar",
        "name": "Doğanhisar",
        "slug": "doganhisar",
        "neighborhoods": []
      },
      {
        "id": "42_emirgazi",
        "name": "Emirgazi",
        "slug": "emirgazi",
        "neighborhoods": []
      },
      {
        "id": "42_eregli",
        "name": "Ereğli",
        "slug": "eregli",
        "neighborhoods": []
      },
      {
        "id": "42_guneysinir",
        "name": "Güneysınır",
        "slug": "guneysinir",
        "neighborhoods": []
      },
      {
        "id": "42_hadim",
        "name": "Hadim",
        "slug": "hadim",
        "neighborhoods": []
      },
      {
        "id": "42_halkapinar",
        "name": "Halkapınar",
        "slug": "halkapinar",
        "neighborhoods": []
      },
      {
        "id": "42_huyuk",
        "name": "Hüyük",
        "slug": "huyuk",
        "neighborhoods": []
      },
      {
        "id": "42_ilgin",
        "name": "Ilgın",
        "slug": "ilgin",
        "neighborhoods": []
      },
      {
        "id": "42_kadinhani",
        "name": "Kadınhanı",
        "slug": "kadinhani",
        "neighborhoods": []
      },
      {
        "id": "42_karapinar",
        "name": "Karapınar",
        "slug": "karapinar",
        "neighborhoods": []
      },
      {
        "id": "42_karatay",
        "name": "Karatay",
        "slug": "karatay",
        "neighborhoods": []
      },
      {
        "id": "42_kulu",
        "name": "Kulu",
        "slug": "kulu",
        "neighborhoods": []
      },
      {
        "id": "42_meram",
        "name": "Meram",
        "slug": "meram",
        "neighborhoods": []
      },
      {
        "id": "42_sarayonu",
        "name": "Sarayönü",
        "slug": "sarayonu",
        "neighborhoods": []
      },
      {
        "id": "42_selcuklu",
        "name": "Selçuklu",
        "slug": "selcuklu",
        "neighborhoods": []
      },
      {
        "id": "42_seydisehir",
        "name": "Seydişehir",
        "slug": "seydisehir",
        "neighborhoods": []
      },
      {
        "id": "42_taskent",
        "name": "Taşkent",
        "slug": "taskent",
        "neighborhoods": []
      },
      {
        "id": "42_tuzlukcu",
        "name": "Tuzlukçu",
        "slug": "tuzlukcu",
        "neighborhoods": []
      },
      {
        "id": "42_yalihuyuk",
        "name": "Yalıhüyük",
        "slug": "yalihuyuk",
        "neighborhoods": []
      },
      {
        "id": "42_yunak",
        "name": "Yunak",
        "slug": "yunak",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "43",
    "name": "Kütahya",
    "slug": "kutahya",
    "districts": [
      {
        "id": "43_altintas",
        "name": "Altıntaş",
        "slug": "altintas",
        "neighborhoods": []
      },
      {
        "id": "43_aslanapa",
        "name": "Aslanapa",
        "slug": "aslanapa",
        "neighborhoods": []
      },
      {
        "id": "43_cavdarhisar",
        "name": "Çavdarhisar",
        "slug": "cavdarhisar",
        "neighborhoods": []
      },
      {
        "id": "43_domanic",
        "name": "Domaniç",
        "slug": "domanic",
        "neighborhoods": []
      },
      {
        "id": "43_dumlupinar",
        "name": "Dumlupınar",
        "slug": "dumlupinar",
        "neighborhoods": []
      },
      {
        "id": "43_emet",
        "name": "Emet",
        "slug": "emet",
        "neighborhoods": []
      },
      {
        "id": "43_gediz",
        "name": "Gediz",
        "slug": "gediz",
        "neighborhoods": []
      },
      {
        "id": "43_hisarcik",
        "name": "Hisarcık",
        "slug": "hisarcik",
        "neighborhoods": []
      },
      {
        "id": "43_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "43_pazarlar",
        "name": "Pazarlar",
        "slug": "pazarlar",
        "neighborhoods": []
      },
      {
        "id": "43_simav",
        "name": "Simav",
        "slug": "simav",
        "neighborhoods": []
      },
      {
        "id": "43_saphane",
        "name": "Şaphane",
        "slug": "saphane",
        "neighborhoods": []
      },
      {
        "id": "43_tavsanli",
        "name": "Tavşanlı",
        "slug": "tavsanli",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "44",
    "name": "Malatya",
    "slug": "malatya",
    "districts": [
      {
        "id": "44_akcadag",
        "name": "Akçadağ",
        "slug": "akcadag",
        "neighborhoods": []
      },
      {
        "id": "44_arapgir",
        "name": "Arapgir",
        "slug": "arapgir",
        "neighborhoods": []
      },
      {
        "id": "44_arguvan",
        "name": "Arguvan",
        "slug": "arguvan",
        "neighborhoods": []
      },
      {
        "id": "44_battalgazi",
        "name": "Battalgazi",
        "slug": "battalgazi",
        "neighborhoods": []
      },
      {
        "id": "44_darende",
        "name": "Darende",
        "slug": "darende",
        "neighborhoods": []
      },
      {
        "id": "44_dogansehir",
        "name": "Doğanşehir",
        "slug": "dogansehir",
        "neighborhoods": []
      },
      {
        "id": "44_doganyol",
        "name": "Doğanyol",
        "slug": "doganyol",
        "neighborhoods": []
      },
      {
        "id": "44_hekimhan",
        "name": "Hekimhan",
        "slug": "hekimhan",
        "neighborhoods": []
      },
      {
        "id": "44_kale",
        "name": "Kale",
        "slug": "kale",
        "neighborhoods": []
      },
      {
        "id": "44_kuluncak",
        "name": "Kuluncak",
        "slug": "kuluncak",
        "neighborhoods": []
      },
      {
        "id": "44_puturge",
        "name": "Pütürge",
        "slug": "puturge",
        "neighborhoods": []
      },
      {
        "id": "44_yazihan",
        "name": "Yazıhan",
        "slug": "yazihan",
        "neighborhoods": []
      },
      {
        "id": "44_yesilyurt",
        "name": "Yeşilyurt",
        "slug": "yesilyurt",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "45",
    "name": "Manisa",
    "slug": "manisa",
    "districts": [
      {
        "id": "45_ahmetli",
        "name": "Ahmetli",
        "slug": "ahmetli",
        "neighborhoods": []
      },
      {
        "id": "45_akhisar",
        "name": "Akhisar",
        "slug": "akhisar",
        "neighborhoods": []
      },
      {
        "id": "45_alasehir",
        "name": "Alaşehir",
        "slug": "alasehir",
        "neighborhoods": []
      },
      {
        "id": "45_demirci",
        "name": "Demirci",
        "slug": "demirci",
        "neighborhoods": []
      },
      {
        "id": "45_golmarmara",
        "name": "Gölmarmara",
        "slug": "golmarmara",
        "neighborhoods": []
      },
      {
        "id": "45_gordes",
        "name": "Gördes",
        "slug": "gordes",
        "neighborhoods": []
      },
      {
        "id": "45_kirkagac",
        "name": "Kırkağaç",
        "slug": "kirkagac",
        "neighborhoods": []
      },
      {
        "id": "45_koprubasi",
        "name": "Köprübaşı",
        "slug": "koprubasi",
        "neighborhoods": []
      },
      {
        "id": "45_kula",
        "name": "Kula",
        "slug": "kula",
        "neighborhoods": []
      },
      {
        "id": "45_salihli",
        "name": "Salihli",
        "slug": "salihli",
        "neighborhoods": []
      },
      {
        "id": "45_sarigol",
        "name": "Sarıgöl",
        "slug": "sarigol",
        "neighborhoods": []
      },
      {
        "id": "45_saruhanli",
        "name": "Saruhanlı",
        "slug": "saruhanli",
        "neighborhoods": []
      },
      {
        "id": "45_selendi",
        "name": "Selendi",
        "slug": "selendi",
        "neighborhoods": []
      },
      {
        "id": "45_soma",
        "name": "Soma",
        "slug": "soma",
        "neighborhoods": []
      },
      {
        "id": "45_sehzadeler",
        "name": "Şehzadeler",
        "slug": "sehzadeler",
        "neighborhoods": []
      },
      {
        "id": "45_turgutlu",
        "name": "Turgutlu",
        "slug": "turgutlu",
        "neighborhoods": []
      },
      {
        "id": "45_yunusemre",
        "name": "Yunusemre",
        "slug": "yunusemre",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "46",
    "name": "Kahramanmaraş",
    "slug": "kahramanmaras",
    "districts": [
      {
        "id": "46_afsin",
        "name": "Afşin",
        "slug": "afsin",
        "neighborhoods": []
      },
      {
        "id": "46_andirin",
        "name": "Andırın",
        "slug": "andirin",
        "neighborhoods": []
      },
      {
        "id": "46_caglayancerit",
        "name": "Çağlayancerit",
        "slug": "caglayancerit",
        "neighborhoods": []
      },
      {
        "id": "46_dulkadiroglu",
        "name": "Dulkadiroğlu",
        "slug": "dulkadiroglu",
        "neighborhoods": []
      },
      {
        "id": "46_ekinozu",
        "name": "Ekinözü",
        "slug": "ekinozu",
        "neighborhoods": []
      },
      {
        "id": "46_elbistan",
        "name": "Elbistan",
        "slug": "elbistan",
        "neighborhoods": []
      },
      {
        "id": "46_goksun",
        "name": "Göksun",
        "slug": "goksun",
        "neighborhoods": []
      },
      {
        "id": "46_nurhak",
        "name": "Nurhak",
        "slug": "nurhak",
        "neighborhoods": []
      },
      {
        "id": "46_onikisubat",
        "name": "Onikişubat",
        "slug": "onikisubat",
        "neighborhoods": []
      },
      {
        "id": "46_pazarcik",
        "name": "Pazarcık",
        "slug": "pazarcik",
        "neighborhoods": []
      },
      {
        "id": "46_turkoglu",
        "name": "Türkoğlu",
        "slug": "turkoglu",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "47",
    "name": "Mardin",
    "slug": "mardin",
    "districts": [
      {
        "id": "47_artuklu",
        "name": "Artuklu",
        "slug": "artuklu",
        "neighborhoods": []
      },
      {
        "id": "47_dargecit",
        "name": "Dargeçit",
        "slug": "dargecit",
        "neighborhoods": []
      },
      {
        "id": "47_derik",
        "name": "Derik",
        "slug": "derik",
        "neighborhoods": []
      },
      {
        "id": "47_kiziltepe",
        "name": "Kızıltepe",
        "slug": "kiziltepe",
        "neighborhoods": []
      },
      {
        "id": "47_mazidagi",
        "name": "Mazıdağı",
        "slug": "mazidagi",
        "neighborhoods": []
      },
      {
        "id": "47_midyat",
        "name": "Midyat",
        "slug": "midyat",
        "neighborhoods": []
      },
      {
        "id": "47_nusaybin",
        "name": "Nusaybin",
        "slug": "nusaybin",
        "neighborhoods": []
      },
      {
        "id": "47_omerli",
        "name": "Ömerli",
        "slug": "omerli",
        "neighborhoods": []
      },
      {
        "id": "47_savur",
        "name": "Savur",
        "slug": "savur",
        "neighborhoods": []
      },
      {
        "id": "47_yesilli",
        "name": "Yeşilli",
        "slug": "yesilli",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "48",
    "name": "Muğla",
    "slug": "mugla",
    "districts": [
      {
        "id": "48_bodrum",
        "name": "Bodrum",
        "slug": "bodrum",
        "neighborhoods": []
      },
      {
        "id": "48_dalaman",
        "name": "Dalaman",
        "slug": "dalaman",
        "neighborhoods": []
      },
      {
        "id": "48_datca",
        "name": "Datça",
        "slug": "datca",
        "neighborhoods": []
      },
      {
        "id": "48_fethiye",
        "name": "Fethiye",
        "slug": "fethiye",
        "neighborhoods": []
      },
      {
        "id": "48_kavaklidere",
        "name": "Kavaklıdere",
        "slug": "kavaklidere",
        "neighborhoods": []
      },
      {
        "id": "48_koycegiz",
        "name": "Köyceğiz",
        "slug": "koycegiz",
        "neighborhoods": []
      },
      {
        "id": "48_marmaris",
        "name": "Marmaris",
        "slug": "marmaris",
        "neighborhoods": []
      },
      {
        "id": "48_mentese",
        "name": "Menteşe",
        "slug": "mentese",
        "neighborhoods": []
      },
      {
        "id": "48_milas",
        "name": "Milas",
        "slug": "milas",
        "neighborhoods": []
      },
      {
        "id": "48_ortaca",
        "name": "Ortaca",
        "slug": "ortaca",
        "neighborhoods": []
      },
      {
        "id": "48_seydikemer",
        "name": "Seydikemer",
        "slug": "seydikemer",
        "neighborhoods": []
      },
      {
        "id": "48_ula",
        "name": "Ula",
        "slug": "ula",
        "neighborhoods": []
      },
      {
        "id": "48_yatagan",
        "name": "Yatağan",
        "slug": "yatagan",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "49",
    "name": "Muş",
    "slug": "mus",
    "districts": [
      {
        "id": "49_bulanik",
        "name": "Bulanık",
        "slug": "bulanik",
        "neighborhoods": []
      },
      {
        "id": "49_haskoy",
        "name": "Hasköy",
        "slug": "haskoy",
        "neighborhoods": []
      },
      {
        "id": "49_korkut",
        "name": "Korkut",
        "slug": "korkut",
        "neighborhoods": []
      },
      {
        "id": "49_malazgirt",
        "name": "Malazgirt",
        "slug": "malazgirt",
        "neighborhoods": []
      },
      {
        "id": "49_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "49_varto",
        "name": "Varto",
        "slug": "varto",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "50",
    "name": "Nevşehir",
    "slug": "nevsehir",
    "districts": [
      {
        "id": "50_acigol",
        "name": "Acıgöl",
        "slug": "acigol",
        "neighborhoods": []
      },
      {
        "id": "50_avanos",
        "name": "Avanos",
        "slug": "avanos",
        "neighborhoods": []
      },
      {
        "id": "50_derinkuyu",
        "name": "Derinkuyu",
        "slug": "derinkuyu",
        "neighborhoods": []
      },
      {
        "id": "50_gulsehir",
        "name": "Gülşehir",
        "slug": "gulsehir",
        "neighborhoods": []
      },
      {
        "id": "50_hacibektas",
        "name": "Hacıbektaş",
        "slug": "hacibektas",
        "neighborhoods": []
      },
      {
        "id": "50_kozakli",
        "name": "Kozaklı",
        "slug": "kozakli",
        "neighborhoods": []
      },
      {
        "id": "50_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "50_urgup",
        "name": "Ürgüp",
        "slug": "urgup",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "51",
    "name": "Niğde",
    "slug": "nigde",
    "districts": [
      {
        "id": "51_altunhisar",
        "name": "Altunhisar",
        "slug": "altunhisar",
        "neighborhoods": []
      },
      {
        "id": "51_bor",
        "name": "Bor",
        "slug": "bor",
        "neighborhoods": []
      },
      {
        "id": "51_camardi",
        "name": "Çamardı",
        "slug": "camardi",
        "neighborhoods": []
      },
      {
        "id": "51_ciftlik",
        "name": "Çiftlik",
        "slug": "ciftlik",
        "neighborhoods": []
      },
      {
        "id": "51_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "51_ulukisla",
        "name": "Ulukışla",
        "slug": "ulukisla",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "52",
    "name": "Ordu",
    "slug": "ordu",
    "districts": [
      {
        "id": "52_akkus",
        "name": "Akkuş",
        "slug": "akkus",
        "neighborhoods": []
      },
      {
        "id": "52_altinordu",
        "name": "Altınordu",
        "slug": "altinordu",
        "neighborhoods": []
      },
      {
        "id": "52_aybasti",
        "name": "Aybastı",
        "slug": "aybasti",
        "neighborhoods": []
      },
      {
        "id": "52_camas",
        "name": "Çamaş",
        "slug": "camas",
        "neighborhoods": []
      },
      {
        "id": "52_catalpinar",
        "name": "Çatalpınar",
        "slug": "catalpinar",
        "neighborhoods": []
      },
      {
        "id": "52_caybasi",
        "name": "Çaybaşı",
        "slug": "caybasi",
        "neighborhoods": []
      },
      {
        "id": "52_fatsa",
        "name": "Fatsa",
        "slug": "fatsa",
        "neighborhoods": []
      },
      {
        "id": "52_golkoy",
        "name": "Gölköy",
        "slug": "golkoy",
        "neighborhoods": []
      },
      {
        "id": "52_gulyali",
        "name": "Gülyalı",
        "slug": "gulyali",
        "neighborhoods": []
      },
      {
        "id": "52_gurgentepe",
        "name": "Gürgentepe",
        "slug": "gurgentepe",
        "neighborhoods": []
      },
      {
        "id": "52_i-kizce",
        "name": "İkizce",
        "slug": "i-kizce",
        "neighborhoods": []
      },
      {
        "id": "52_kabaduz",
        "name": "Kabadüz",
        "slug": "kabaduz",
        "neighborhoods": []
      },
      {
        "id": "52_kabatas",
        "name": "Kabataş",
        "slug": "kabatas",
        "neighborhoods": []
      },
      {
        "id": "52_korgan",
        "name": "Korgan",
        "slug": "korgan",
        "neighborhoods": []
      },
      {
        "id": "52_kumru",
        "name": "Kumru",
        "slug": "kumru",
        "neighborhoods": []
      },
      {
        "id": "52_mesudiye",
        "name": "Mesudiye",
        "slug": "mesudiye",
        "neighborhoods": []
      },
      {
        "id": "52_persembe",
        "name": "Perşembe",
        "slug": "persembe",
        "neighborhoods": []
      },
      {
        "id": "52_ulubey",
        "name": "Ulubey",
        "slug": "ulubey",
        "neighborhoods": []
      },
      {
        "id": "52_unye",
        "name": "Ünye",
        "slug": "unye",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "53",
    "name": "Rize",
    "slug": "rize",
    "districts": [
      {
        "id": "53_ardesen",
        "name": "Ardeşen",
        "slug": "ardesen",
        "neighborhoods": []
      },
      {
        "id": "53_camlihemsin",
        "name": "Çamlıhemşin",
        "slug": "camlihemsin",
        "neighborhoods": []
      },
      {
        "id": "53_cayeli",
        "name": "Çayeli",
        "slug": "cayeli",
        "neighborhoods": []
      },
      {
        "id": "53_derepazari",
        "name": "Derepazarı",
        "slug": "derepazari",
        "neighborhoods": []
      },
      {
        "id": "53_findikli",
        "name": "Fındıklı",
        "slug": "findikli",
        "neighborhoods": []
      },
      {
        "id": "53_guneysu",
        "name": "Güneysu",
        "slug": "guneysu",
        "neighborhoods": []
      },
      {
        "id": "53_hemsin",
        "name": "Hemşin",
        "slug": "hemsin",
        "neighborhoods": []
      },
      {
        "id": "53_i-kizdere",
        "name": "İkizdere",
        "slug": "i-kizdere",
        "neighborhoods": []
      },
      {
        "id": "53_i-yidere",
        "name": "İyidere",
        "slug": "i-yidere",
        "neighborhoods": []
      },
      {
        "id": "53_kalkandere",
        "name": "Kalkandere",
        "slug": "kalkandere",
        "neighborhoods": []
      },
      {
        "id": "53_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "53_pazar",
        "name": "Pazar",
        "slug": "pazar",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "54",
    "name": "Sakarya",
    "slug": "sakarya",
    "districts": [
      {
        "id": "54_adapazari",
        "name": "Adapazarı",
        "slug": "adapazari",
        "neighborhoods": []
      },
      {
        "id": "54_akyazi",
        "name": "Akyazı",
        "slug": "akyazi",
        "neighborhoods": []
      },
      {
        "id": "54_arifiye",
        "name": "Arifiye",
        "slug": "arifiye",
        "neighborhoods": []
      },
      {
        "id": "54_erenler",
        "name": "Erenler",
        "slug": "erenler",
        "neighborhoods": []
      },
      {
        "id": "54_ferizli",
        "name": "Ferizli",
        "slug": "ferizli",
        "neighborhoods": []
      },
      {
        "id": "54_geyve",
        "name": "Geyve",
        "slug": "geyve",
        "neighborhoods": []
      },
      {
        "id": "54_hendek",
        "name": "Hendek",
        "slug": "hendek",
        "neighborhoods": []
      },
      {
        "id": "54_karapurcek",
        "name": "Karapürçek",
        "slug": "karapurcek",
        "neighborhoods": []
      },
      {
        "id": "54_karasu",
        "name": "Karasu",
        "slug": "karasu",
        "neighborhoods": []
      },
      {
        "id": "54_kaynarca",
        "name": "Kaynarca",
        "slug": "kaynarca",
        "neighborhoods": []
      },
      {
        "id": "54_kocaali",
        "name": "Kocaali",
        "slug": "kocaali",
        "neighborhoods": []
      },
      {
        "id": "54_pamukova",
        "name": "Pamukova",
        "slug": "pamukova",
        "neighborhoods": []
      },
      {
        "id": "54_sapanca",
        "name": "Sapanca",
        "slug": "sapanca",
        "neighborhoods": []
      },
      {
        "id": "54_serdivan",
        "name": "Serdivan",
        "slug": "serdivan",
        "neighborhoods": []
      },
      {
        "id": "54_sogutlu",
        "name": "Söğütlü",
        "slug": "sogutlu",
        "neighborhoods": []
      },
      {
        "id": "54_tarakli",
        "name": "Taraklı",
        "slug": "tarakli",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "55",
    "name": "Samsun",
    "slug": "samsun",
    "districts": [
      {
        "id": "55_19-mayis",
        "name": "19 Mayıs",
        "slug": "19-mayis",
        "neighborhoods": []
      },
      {
        "id": "55_alacam",
        "name": "Alaçam",
        "slug": "alacam",
        "neighborhoods": []
      },
      {
        "id": "55_asarcik",
        "name": "Asarcık",
        "slug": "asarcik",
        "neighborhoods": []
      },
      {
        "id": "55_atakum",
        "name": "Atakum",
        "slug": "atakum",
        "neighborhoods": []
      },
      {
        "id": "55_ayvacik",
        "name": "Ayvacık",
        "slug": "ayvacik",
        "neighborhoods": []
      },
      {
        "id": "55_bafra",
        "name": "Bafra",
        "slug": "bafra",
        "neighborhoods": []
      },
      {
        "id": "55_canik",
        "name": "Canik",
        "slug": "canik",
        "neighborhoods": []
      },
      {
        "id": "55_carsamba",
        "name": "Çarşamba",
        "slug": "carsamba",
        "neighborhoods": []
      },
      {
        "id": "55_havza",
        "name": "Havza",
        "slug": "havza",
        "neighborhoods": []
      },
      {
        "id": "55_i-lkadim",
        "name": "İlkadım",
        "slug": "i-lkadim",
        "neighborhoods": []
      },
      {
        "id": "55_kavak",
        "name": "Kavak",
        "slug": "kavak",
        "neighborhoods": []
      },
      {
        "id": "55_ladik",
        "name": "Ladik",
        "slug": "ladik",
        "neighborhoods": []
      },
      {
        "id": "55_salipazari",
        "name": "Salıpazarı",
        "slug": "salipazari",
        "neighborhoods": []
      },
      {
        "id": "55_tekkekoy",
        "name": "Tekkeköy",
        "slug": "tekkekoy",
        "neighborhoods": []
      },
      {
        "id": "55_terme",
        "name": "Terme",
        "slug": "terme",
        "neighborhoods": []
      },
      {
        "id": "55_vezirkopru",
        "name": "Vezirköprü",
        "slug": "vezirkopru",
        "neighborhoods": []
      },
      {
        "id": "55_yakakent",
        "name": "Yakakent",
        "slug": "yakakent",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "56",
    "name": "Siirt",
    "slug": "siirt",
    "districts": [
      {
        "id": "56_baykan",
        "name": "Baykan",
        "slug": "baykan",
        "neighborhoods": []
      },
      {
        "id": "56_eruh",
        "name": "Eruh",
        "slug": "eruh",
        "neighborhoods": []
      },
      {
        "id": "56_kurtalan",
        "name": "Kurtalan",
        "slug": "kurtalan",
        "neighborhoods": []
      },
      {
        "id": "56_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "56_pervari",
        "name": "Pervari",
        "slug": "pervari",
        "neighborhoods": []
      },
      {
        "id": "56_sirvan",
        "name": "Şirvan",
        "slug": "sirvan",
        "neighborhoods": []
      },
      {
        "id": "56_tillo",
        "name": "Tillo",
        "slug": "tillo",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "57",
    "name": "Sinop",
    "slug": "sinop",
    "districts": [
      {
        "id": "57_ayancik",
        "name": "Ayancık",
        "slug": "ayancik",
        "neighborhoods": []
      },
      {
        "id": "57_boyabat",
        "name": "Boyabat",
        "slug": "boyabat",
        "neighborhoods": []
      },
      {
        "id": "57_dikmen",
        "name": "Dikmen",
        "slug": "dikmen",
        "neighborhoods": []
      },
      {
        "id": "57_duragan",
        "name": "Durağan",
        "slug": "duragan",
        "neighborhoods": []
      },
      {
        "id": "57_erfelek",
        "name": "Erfelek",
        "slug": "erfelek",
        "neighborhoods": []
      },
      {
        "id": "57_gerze",
        "name": "Gerze",
        "slug": "gerze",
        "neighborhoods": []
      },
      {
        "id": "57_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "57_sarayduzu",
        "name": "Saraydüzü",
        "slug": "sarayduzu",
        "neighborhoods": []
      },
      {
        "id": "57_turkeli",
        "name": "Türkeli",
        "slug": "turkeli",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "58",
    "name": "Sivas",
    "slug": "sivas",
    "districts": [
      {
        "id": "58_akincilar",
        "name": "Akıncılar",
        "slug": "akincilar",
        "neighborhoods": []
      },
      {
        "id": "58_altinyayla",
        "name": "Altınyayla",
        "slug": "altinyayla",
        "neighborhoods": []
      },
      {
        "id": "58_divrigi",
        "name": "Divriği",
        "slug": "divrigi",
        "neighborhoods": []
      },
      {
        "id": "58_dogansar",
        "name": "Doğanşar",
        "slug": "dogansar",
        "neighborhoods": []
      },
      {
        "id": "58_gemerek",
        "name": "Gemerek",
        "slug": "gemerek",
        "neighborhoods": []
      },
      {
        "id": "58_golova",
        "name": "Gölova",
        "slug": "golova",
        "neighborhoods": []
      },
      {
        "id": "58_gurun",
        "name": "Gürün",
        "slug": "gurun",
        "neighborhoods": []
      },
      {
        "id": "58_hafik",
        "name": "Hafik",
        "slug": "hafik",
        "neighborhoods": []
      },
      {
        "id": "58_i-mranli",
        "name": "İmranlı",
        "slug": "i-mranli",
        "neighborhoods": []
      },
      {
        "id": "58_kangal",
        "name": "Kangal",
        "slug": "kangal",
        "neighborhoods": []
      },
      {
        "id": "58_koyulhisar",
        "name": "Koyulhisar",
        "slug": "koyulhisar",
        "neighborhoods": []
      },
      {
        "id": "58_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "58_susehri",
        "name": "Suşehri",
        "slug": "susehri",
        "neighborhoods": []
      },
      {
        "id": "58_sarkisla",
        "name": "Şarkışla",
        "slug": "sarkisla",
        "neighborhoods": []
      },
      {
        "id": "58_ulas",
        "name": "Ulaş",
        "slug": "ulas",
        "neighborhoods": []
      },
      {
        "id": "58_yildizeli",
        "name": "Yıldızeli",
        "slug": "yildizeli",
        "neighborhoods": []
      },
      {
        "id": "58_zara",
        "name": "Zara",
        "slug": "zara",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "59",
    "name": "Tekirdağ",
    "slug": "tekirdag",
    "districts": [
      {
        "id": "59_cerkezkoy",
        "name": "Çerkezköy",
        "slug": "cerkezkoy",
        "neighborhoods": []
      },
      {
        "id": "59_corlu",
        "name": "Çorlu",
        "slug": "corlu",
        "neighborhoods": []
      },
      {
        "id": "59_ergene",
        "name": "Ergene",
        "slug": "ergene",
        "neighborhoods": []
      },
      {
        "id": "59_hayrabolu",
        "name": "Hayrabolu",
        "slug": "hayrabolu",
        "neighborhoods": []
      },
      {
        "id": "59_kapakli",
        "name": "Kapaklı",
        "slug": "kapakli",
        "neighborhoods": []
      },
      {
        "id": "59_malkara",
        "name": "Malkara",
        "slug": "malkara",
        "neighborhoods": []
      },
      {
        "id": "59_marmaraereglisi",
        "name": "Marmaraereğlisi",
        "slug": "marmaraereglisi",
        "neighborhoods": []
      },
      {
        "id": "59_muratli",
        "name": "Muratlı",
        "slug": "muratli",
        "neighborhoods": []
      },
      {
        "id": "59_saray",
        "name": "Saray",
        "slug": "saray",
        "neighborhoods": []
      },
      {
        "id": "59_suleymanpasa",
        "name": "Süleymanpaşa",
        "slug": "suleymanpasa",
        "neighborhoods": []
      },
      {
        "id": "59_sarkoy",
        "name": "Şarköy",
        "slug": "sarkoy",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "60",
    "name": "Tokat",
    "slug": "tokat",
    "districts": [
      {
        "id": "60_almus",
        "name": "Almus",
        "slug": "almus",
        "neighborhoods": []
      },
      {
        "id": "60_artova",
        "name": "Artova",
        "slug": "artova",
        "neighborhoods": []
      },
      {
        "id": "60_basciftlik",
        "name": "Başçiftlik",
        "slug": "basciftlik",
        "neighborhoods": []
      },
      {
        "id": "60_erbaa",
        "name": "Erbaa",
        "slug": "erbaa",
        "neighborhoods": []
      },
      {
        "id": "60_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "60_niksar",
        "name": "Niksar",
        "slug": "niksar",
        "neighborhoods": []
      },
      {
        "id": "60_pazar",
        "name": "Pazar",
        "slug": "pazar",
        "neighborhoods": []
      },
      {
        "id": "60_resadiye",
        "name": "Reşadiye",
        "slug": "resadiye",
        "neighborhoods": []
      },
      {
        "id": "60_sulusaray",
        "name": "Sulusaray",
        "slug": "sulusaray",
        "neighborhoods": []
      },
      {
        "id": "60_turhal",
        "name": "Turhal",
        "slug": "turhal",
        "neighborhoods": []
      },
      {
        "id": "60_yesilyurt",
        "name": "Yeşilyurt",
        "slug": "yesilyurt",
        "neighborhoods": []
      },
      {
        "id": "60_zile",
        "name": "Zile",
        "slug": "zile",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "61",
    "name": "Trabzon",
    "slug": "trabzon",
    "districts": [
      {
        "id": "61_akcaabat",
        "name": "Akçaabat",
        "slug": "akcaabat",
        "neighborhoods": []
      },
      {
        "id": "61_arakli",
        "name": "Araklı",
        "slug": "arakli",
        "neighborhoods": []
      },
      {
        "id": "61_arsin",
        "name": "Arsin",
        "slug": "arsin",
        "neighborhoods": []
      },
      {
        "id": "61_besikduzu",
        "name": "Beşikdüzü",
        "slug": "besikduzu",
        "neighborhoods": []
      },
      {
        "id": "61_carsibasi",
        "name": "Çarşıbaşı",
        "slug": "carsibasi",
        "neighborhoods": []
      },
      {
        "id": "61_caykara",
        "name": "Çaykara",
        "slug": "caykara",
        "neighborhoods": []
      },
      {
        "id": "61_dernekpazari",
        "name": "Dernekpazarı",
        "slug": "dernekpazari",
        "neighborhoods": []
      },
      {
        "id": "61_duzkoy",
        "name": "Düzköy",
        "slug": "duzkoy",
        "neighborhoods": []
      },
      {
        "id": "61_hayrat",
        "name": "Hayrat",
        "slug": "hayrat",
        "neighborhoods": []
      },
      {
        "id": "61_koprubasi",
        "name": "Köprübaşı",
        "slug": "koprubasi",
        "neighborhoods": []
      },
      {
        "id": "61_macka",
        "name": "Maçka",
        "slug": "macka",
        "neighborhoods": []
      },
      {
        "id": "61_of",
        "name": "Of",
        "slug": "of",
        "neighborhoods": []
      },
      {
        "id": "61_ortahisar",
        "name": "Ortahisar",
        "slug": "ortahisar",
        "neighborhoods": []
      },
      {
        "id": "61_surmene",
        "name": "Sürmene",
        "slug": "surmene",
        "neighborhoods": []
      },
      {
        "id": "61_salpazari",
        "name": "Şalpazarı",
        "slug": "salpazari",
        "neighborhoods": []
      },
      {
        "id": "61_tonya",
        "name": "Tonya",
        "slug": "tonya",
        "neighborhoods": []
      },
      {
        "id": "61_vakfikebir",
        "name": "Vakfıkebir",
        "slug": "vakfikebir",
        "neighborhoods": []
      },
      {
        "id": "61_yomra",
        "name": "Yomra",
        "slug": "yomra",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "62",
    "name": "Tunceli",
    "slug": "tunceli",
    "districts": [
      {
        "id": "62_cemisgezek",
        "name": "Çemişgezek",
        "slug": "cemisgezek",
        "neighborhoods": []
      },
      {
        "id": "62_hozat",
        "name": "Hozat",
        "slug": "hozat",
        "neighborhoods": []
      },
      {
        "id": "62_mazgirt",
        "name": "Mazgirt",
        "slug": "mazgirt",
        "neighborhoods": []
      },
      {
        "id": "62_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "62_nazimiye",
        "name": "Nazımiye",
        "slug": "nazimiye",
        "neighborhoods": []
      },
      {
        "id": "62_ovacik",
        "name": "Ovacık",
        "slug": "ovacik",
        "neighborhoods": []
      },
      {
        "id": "62_pertek",
        "name": "Pertek",
        "slug": "pertek",
        "neighborhoods": []
      },
      {
        "id": "62_pulumur",
        "name": "Pülümür",
        "slug": "pulumur",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "63",
    "name": "Şanlıurfa",
    "slug": "sanliurfa",
    "districts": [
      {
        "id": "63_akcakale",
        "name": "Akçakale",
        "slug": "akcakale",
        "neighborhoods": []
      },
      {
        "id": "63_birecik",
        "name": "Birecik",
        "slug": "birecik",
        "neighborhoods": []
      },
      {
        "id": "63_bozova",
        "name": "Bozova",
        "slug": "bozova",
        "neighborhoods": []
      },
      {
        "id": "63_ceylanpinar",
        "name": "Ceylanpınar",
        "slug": "ceylanpinar",
        "neighborhoods": []
      },
      {
        "id": "63_eyyubiye",
        "name": "Eyyübiye",
        "slug": "eyyubiye",
        "neighborhoods": []
      },
      {
        "id": "63_halfeti",
        "name": "Halfeti",
        "slug": "halfeti",
        "neighborhoods": []
      },
      {
        "id": "63_haliliye",
        "name": "Haliliye",
        "slug": "haliliye",
        "neighborhoods": []
      },
      {
        "id": "63_harran",
        "name": "Harran",
        "slug": "harran",
        "neighborhoods": []
      },
      {
        "id": "63_hilvan",
        "name": "Hilvan",
        "slug": "hilvan",
        "neighborhoods": []
      },
      {
        "id": "63_karakopru",
        "name": "Karaköprü",
        "slug": "karakopru",
        "neighborhoods": []
      },
      {
        "id": "63_siverek",
        "name": "Siverek",
        "slug": "siverek",
        "neighborhoods": []
      },
      {
        "id": "63_suruc",
        "name": "Suruç",
        "slug": "suruc",
        "neighborhoods": []
      },
      {
        "id": "63_viransehir",
        "name": "Viranşehir",
        "slug": "viransehir",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "64",
    "name": "Uşak",
    "slug": "usak",
    "districts": [
      {
        "id": "64_banaz",
        "name": "Banaz",
        "slug": "banaz",
        "neighborhoods": []
      },
      {
        "id": "64_esme",
        "name": "Eşme",
        "slug": "esme",
        "neighborhoods": []
      },
      {
        "id": "64_karahalli",
        "name": "Karahallı",
        "slug": "karahalli",
        "neighborhoods": []
      },
      {
        "id": "64_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "64_sivasli",
        "name": "Sivaslı",
        "slug": "sivasli",
        "neighborhoods": []
      },
      {
        "id": "64_ulubey",
        "name": "Ulubey",
        "slug": "ulubey",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "65",
    "name": "Van",
    "slug": "van",
    "districts": [
      {
        "id": "65_bahcesaray",
        "name": "Bahçesaray",
        "slug": "bahcesaray",
        "neighborhoods": []
      },
      {
        "id": "65_baskale",
        "name": "Başkale",
        "slug": "baskale",
        "neighborhoods": []
      },
      {
        "id": "65_caldiran",
        "name": "Çaldıran",
        "slug": "caldiran",
        "neighborhoods": []
      },
      {
        "id": "65_catak",
        "name": "Çatak",
        "slug": "catak",
        "neighborhoods": []
      },
      {
        "id": "65_edremit",
        "name": "Edremit",
        "slug": "edremit",
        "neighborhoods": []
      },
      {
        "id": "65_ercis",
        "name": "Erciş",
        "slug": "ercis",
        "neighborhoods": []
      },
      {
        "id": "65_gevas",
        "name": "Gevaş",
        "slug": "gevas",
        "neighborhoods": []
      },
      {
        "id": "65_gurpinar",
        "name": "Gürpınar",
        "slug": "gurpinar",
        "neighborhoods": []
      },
      {
        "id": "65_i-pekyolu",
        "name": "İpekyolu",
        "slug": "i-pekyolu",
        "neighborhoods": []
      },
      {
        "id": "65_muradiye",
        "name": "Muradiye",
        "slug": "muradiye",
        "neighborhoods": []
      },
      {
        "id": "65_ozalp",
        "name": "Özalp",
        "slug": "ozalp",
        "neighborhoods": []
      },
      {
        "id": "65_saray",
        "name": "Saray",
        "slug": "saray",
        "neighborhoods": []
      },
      {
        "id": "65_tusba",
        "name": "Tuşba",
        "slug": "tusba",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "66",
    "name": "Yozgat",
    "slug": "yozgat",
    "districts": [
      {
        "id": "66_akdagmadeni",
        "name": "Akdağmadeni",
        "slug": "akdagmadeni",
        "neighborhoods": []
      },
      {
        "id": "66_aydincik",
        "name": "Aydıncık",
        "slug": "aydincik",
        "neighborhoods": []
      },
      {
        "id": "66_bogazliyan",
        "name": "Boğazlıyan",
        "slug": "bogazliyan",
        "neighborhoods": []
      },
      {
        "id": "66_candir",
        "name": "Çandır",
        "slug": "candir",
        "neighborhoods": []
      },
      {
        "id": "66_cayiralan",
        "name": "Çayıralan",
        "slug": "cayiralan",
        "neighborhoods": []
      },
      {
        "id": "66_cekerek",
        "name": "Çekerek",
        "slug": "cekerek",
        "neighborhoods": []
      },
      {
        "id": "66_kadisehri",
        "name": "Kadışehri",
        "slug": "kadisehri",
        "neighborhoods": []
      },
      {
        "id": "66_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "66_saraykent",
        "name": "Saraykent",
        "slug": "saraykent",
        "neighborhoods": []
      },
      {
        "id": "66_sarikaya",
        "name": "Sarıkaya",
        "slug": "sarikaya",
        "neighborhoods": []
      },
      {
        "id": "66_sorgun",
        "name": "Sorgun",
        "slug": "sorgun",
        "neighborhoods": []
      },
      {
        "id": "66_sefaatli",
        "name": "Şefaatli",
        "slug": "sefaatli",
        "neighborhoods": []
      },
      {
        "id": "66_yenifakili",
        "name": "Yenifakılı",
        "slug": "yenifakili",
        "neighborhoods": []
      },
      {
        "id": "66_yerkoy",
        "name": "Yerköy",
        "slug": "yerkoy",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "67",
    "name": "Zonguldak",
    "slug": "zonguldak",
    "districts": [
      {
        "id": "67_alapli",
        "name": "Alaplı",
        "slug": "alapli",
        "neighborhoods": []
      },
      {
        "id": "67_caycuma",
        "name": "Çaycuma",
        "slug": "caycuma",
        "neighborhoods": []
      },
      {
        "id": "67_devrek",
        "name": "Devrek",
        "slug": "devrek",
        "neighborhoods": []
      },
      {
        "id": "67_eregli",
        "name": "Ereğli",
        "slug": "eregli",
        "neighborhoods": []
      },
      {
        "id": "67_gokcebey",
        "name": "Gökçebey",
        "slug": "gokcebey",
        "neighborhoods": []
      },
      {
        "id": "67_kilimli",
        "name": "Kilimli",
        "slug": "kilimli",
        "neighborhoods": []
      },
      {
        "id": "67_kozlu",
        "name": "Kozlu",
        "slug": "kozlu",
        "neighborhoods": []
      },
      {
        "id": "67_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "68",
    "name": "Aksaray",
    "slug": "aksaray",
    "districts": [
      {
        "id": "68_agacoren",
        "name": "Ağaçören",
        "slug": "agacoren",
        "neighborhoods": []
      },
      {
        "id": "68_eskil",
        "name": "Eskil",
        "slug": "eskil",
        "neighborhoods": []
      },
      {
        "id": "68_gulagac",
        "name": "Gülağaç",
        "slug": "gulagac",
        "neighborhoods": []
      },
      {
        "id": "68_guzelyurt",
        "name": "Güzelyurt",
        "slug": "guzelyurt",
        "neighborhoods": []
      },
      {
        "id": "68_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "68_ortakoy",
        "name": "Ortaköy",
        "slug": "ortakoy",
        "neighborhoods": []
      },
      {
        "id": "68_sariyahsi",
        "name": "Sarıyahşi",
        "slug": "sariyahsi",
        "neighborhoods": []
      },
      {
        "id": "68_sultanhani",
        "name": "Sultanhanı",
        "slug": "sultanhani",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "69",
    "name": "Bayburt",
    "slug": "bayburt",
    "districts": [
      {
        "id": "69_aydintepe",
        "name": "Aydıntepe",
        "slug": "aydintepe",
        "neighborhoods": []
      },
      {
        "id": "69_demirozu",
        "name": "Demirözü",
        "slug": "demirozu",
        "neighborhoods": []
      },
      {
        "id": "69_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "70",
    "name": "Karaman",
    "slug": "karaman",
    "districts": [
      {
        "id": "70_ayranci",
        "name": "Ayrancı",
        "slug": "ayranci",
        "neighborhoods": []
      },
      {
        "id": "70_basyayla",
        "name": "Başyayla",
        "slug": "basyayla",
        "neighborhoods": []
      },
      {
        "id": "70_ermenek",
        "name": "Ermenek",
        "slug": "ermenek",
        "neighborhoods": []
      },
      {
        "id": "70_kazimkarabekir",
        "name": "Kazımkarabekir",
        "slug": "kazimkarabekir",
        "neighborhoods": []
      },
      {
        "id": "70_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "70_sariveliler",
        "name": "Sarıveliler",
        "slug": "sariveliler",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "71",
    "name": "Kırıkkale",
    "slug": "kirikkale",
    "districts": [
      {
        "id": "71_bahsili",
        "name": "Bahşılı",
        "slug": "bahsili",
        "neighborhoods": []
      },
      {
        "id": "71_baliseyh",
        "name": "Balışeyh",
        "slug": "baliseyh",
        "neighborhoods": []
      },
      {
        "id": "71_celebi",
        "name": "Çelebi",
        "slug": "celebi",
        "neighborhoods": []
      },
      {
        "id": "71_delice",
        "name": "Delice",
        "slug": "delice",
        "neighborhoods": []
      },
      {
        "id": "71_karakecili",
        "name": "Karakeçili",
        "slug": "karakecili",
        "neighborhoods": []
      },
      {
        "id": "71_keskin",
        "name": "Keskin",
        "slug": "keskin",
        "neighborhoods": []
      },
      {
        "id": "71_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "71_sulakyurt",
        "name": "Sulakyurt",
        "slug": "sulakyurt",
        "neighborhoods": []
      },
      {
        "id": "71_yahsihan",
        "name": "Yahşihan",
        "slug": "yahsihan",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "72",
    "name": "Batman",
    "slug": "batman",
    "districts": [
      {
        "id": "72_besiri",
        "name": "Beşiri",
        "slug": "besiri",
        "neighborhoods": []
      },
      {
        "id": "72_gercus",
        "name": "Gercüş",
        "slug": "gercus",
        "neighborhoods": []
      },
      {
        "id": "72_hasankeyf",
        "name": "Hasankeyf",
        "slug": "hasankeyf",
        "neighborhoods": []
      },
      {
        "id": "72_kozluk",
        "name": "Kozluk",
        "slug": "kozluk",
        "neighborhoods": []
      },
      {
        "id": "72_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "72_sason",
        "name": "Sason",
        "slug": "sason",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "73",
    "name": "Şırnak",
    "slug": "sirnak",
    "districts": [
      {
        "id": "73_beytussebap",
        "name": "Beytüşşebap",
        "slug": "beytussebap",
        "neighborhoods": []
      },
      {
        "id": "73_cizre",
        "name": "Cizre",
        "slug": "cizre",
        "neighborhoods": []
      },
      {
        "id": "73_guclukonak",
        "name": "Güçlükonak",
        "slug": "guclukonak",
        "neighborhoods": []
      },
      {
        "id": "73_i-dil",
        "name": "İdil",
        "slug": "i-dil",
        "neighborhoods": []
      },
      {
        "id": "73_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "73_silopi",
        "name": "Silopi",
        "slug": "silopi",
        "neighborhoods": []
      },
      {
        "id": "73_uludere",
        "name": "Uludere",
        "slug": "uludere",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "74",
    "name": "Bartın",
    "slug": "bartin",
    "districts": [
      {
        "id": "74_amasra",
        "name": "Amasra",
        "slug": "amasra",
        "neighborhoods": []
      },
      {
        "id": "74_kurucasile",
        "name": "Kurucaşile",
        "slug": "kurucasile",
        "neighborhoods": []
      },
      {
        "id": "74_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "74_ulus",
        "name": "Ulus",
        "slug": "ulus",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "75",
    "name": "Ardahan",
    "slug": "ardahan",
    "districts": [
      {
        "id": "75_cildir",
        "name": "Çıldır",
        "slug": "cildir",
        "neighborhoods": []
      },
      {
        "id": "75_damal",
        "name": "Damal",
        "slug": "damal",
        "neighborhoods": []
      },
      {
        "id": "75_gole",
        "name": "Göle",
        "slug": "gole",
        "neighborhoods": []
      },
      {
        "id": "75_hanak",
        "name": "Hanak",
        "slug": "hanak",
        "neighborhoods": []
      },
      {
        "id": "75_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "75_posof",
        "name": "Posof",
        "slug": "posof",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "76",
    "name": "Iğdır",
    "slug": "igdir",
    "districts": [
      {
        "id": "76_aralik",
        "name": "Aralık",
        "slug": "aralik",
        "neighborhoods": []
      },
      {
        "id": "76_karakoyunlu",
        "name": "Karakoyunlu",
        "slug": "karakoyunlu",
        "neighborhoods": []
      },
      {
        "id": "76_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "76_tuzluca",
        "name": "Tuzluca",
        "slug": "tuzluca",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "77",
    "name": "Yalova",
    "slug": "yalova",
    "districts": [
      {
        "id": "77_altinova",
        "name": "Altınova",
        "slug": "altinova",
        "neighborhoods": []
      },
      {
        "id": "77_armutlu",
        "name": "Armutlu",
        "slug": "armutlu",
        "neighborhoods": []
      },
      {
        "id": "77_cinarcik",
        "name": "Çınarcık",
        "slug": "cinarcik",
        "neighborhoods": []
      },
      {
        "id": "77_ciftlikkoy",
        "name": "Çiftlikköy",
        "slug": "ciftlikkoy",
        "neighborhoods": []
      },
      {
        "id": "77_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "77_termal",
        "name": "Termal",
        "slug": "termal",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "78",
    "name": "Karabük",
    "slug": "karabuk",
    "districts": [
      {
        "id": "78_eflani",
        "name": "Eflani",
        "slug": "eflani",
        "neighborhoods": []
      },
      {
        "id": "78_eskipazar",
        "name": "Eskipazar",
        "slug": "eskipazar",
        "neighborhoods": []
      },
      {
        "id": "78_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "78_ovacik",
        "name": "Ovacık",
        "slug": "ovacik",
        "neighborhoods": []
      },
      {
        "id": "78_safranbolu",
        "name": "Safranbolu",
        "slug": "safranbolu",
        "neighborhoods": []
      },
      {
        "id": "78_yenice",
        "name": "Yenice",
        "slug": "yenice",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "79",
    "name": "Kilis",
    "slug": "kilis",
    "districts": [
      {
        "id": "79_elbeyli",
        "name": "Elbeyli",
        "slug": "elbeyli",
        "neighborhoods": []
      },
      {
        "id": "79_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "79_musabeyli",
        "name": "Musabeyli",
        "slug": "musabeyli",
        "neighborhoods": []
      },
      {
        "id": "79_polateli",
        "name": "Polateli",
        "slug": "polateli",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "80",
    "name": "Osmaniye",
    "slug": "osmaniye",
    "districts": [
      {
        "id": "80_bahce",
        "name": "Bahçe",
        "slug": "bahce",
        "neighborhoods": []
      },
      {
        "id": "80_duzici",
        "name": "Düziçi",
        "slug": "duzici",
        "neighborhoods": []
      },
      {
        "id": "80_hasanbeyli",
        "name": "Hasanbeyli",
        "slug": "hasanbeyli",
        "neighborhoods": []
      },
      {
        "id": "80_kadirli",
        "name": "Kadirli",
        "slug": "kadirli",
        "neighborhoods": []
      },
      {
        "id": "80_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "80_sumbas",
        "name": "Sumbas",
        "slug": "sumbas",
        "neighborhoods": []
      },
      {
        "id": "80_toprakkale",
        "name": "Toprakkale",
        "slug": "toprakkale",
        "neighborhoods": []
      }
    ]
  },
  {
    "id": "81",
    "name": "Düzce",
    "slug": "duzce",
    "districts": [
      {
        "id": "81_akcakoca",
        "name": "Akçakoca",
        "slug": "akcakoca",
        "neighborhoods": []
      },
      {
        "id": "81_cumayeri",
        "name": "Cumayeri",
        "slug": "cumayeri",
        "neighborhoods": []
      },
      {
        "id": "81_cilimli",
        "name": "Çilimli",
        "slug": "cilimli",
        "neighborhoods": []
      },
      {
        "id": "81_golyaka",
        "name": "Gölyaka",
        "slug": "golyaka",
        "neighborhoods": []
      },
      {
        "id": "81_gumusova",
        "name": "Gümüşova",
        "slug": "gumusova",
        "neighborhoods": []
      },
      {
        "id": "81_kaynasli",
        "name": "Kaynaşlı",
        "slug": "kaynasli",
        "neighborhoods": []
      },
      {
        "id": "81_merkez",
        "name": "Merkez",
        "slug": "merkez",
        "neighborhoods": []
      },
      {
        "id": "81_yigilca",
        "name": "Yığılca",
        "slug": "yigilca",
        "neighborhoods": []
      }
    ]
  }
];

export const getDistrictsByCity = (cityIdentifier: string): District[] => {
  const city = TURKEY_LOCATIONS.find(
    c => c.slug === cityIdentifier.toLowerCase() || c.name.toLowerCase() === cityIdentifier.toLowerCase()
  );
  return city ? city.districts : [];
};

export const getNeighborhoodsByDistrict = (cityIdentifier: string, districtIdentifier: string): Neighborhood[] => {
  const city = TURKEY_LOCATIONS.find(
    c => c.slug === cityIdentifier.toLowerCase() || c.name.toLowerCase() === cityIdentifier.toLowerCase()
  );
  if (!city) return [];

  const district = city.districts.find(
    d => d.slug === districtIdentifier.toLowerCase() || d.name.toLowerCase() === districtIdentifier.toLowerCase()
  );
  return district?.neighborhoods || [];
};

export const getAllCitySlugs = (): string[] => {
  return TURKEY_LOCATIONS.map(c => c.slug);
};
