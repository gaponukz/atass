from typing import Literal

LangCode = Literal['ua', 'en', 'pl']
MultiLanguages = dict[LangCode, dict[str, str]]

enpty_languages: MultiLanguages = { "en": {}, "pl": {}, "ua": {} }

languages: MultiLanguages = {
    "en": {
        "hello": "Hello"
    },
    "pl": {
        "hello": "Witam"
    },
    "ua": {
        "hello": "Привіт"
    }
}
