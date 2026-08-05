"""
Loads the translation model and tokenizer.
"""

from functools import lru_cache

from transformers import (
    AutoTokenizer,
    AutoModelForSeq2SeqLM
)

from backend.config import MODEL_NAME


@lru_cache(maxsize=1)
def load_model():

    tokenizer = AutoTokenizer.from_pretrained(
        MODEL_NAME
    )

    model = AutoModelForSeq2SeqLM.from_pretrained(
        MODEL_NAME,
        use_safetensors=True
    )

    return tokenizer, model