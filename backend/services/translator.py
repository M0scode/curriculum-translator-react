"""
Translation functions.
"""

from backend.config import (
    SOURCE_LANGUAGE,
    TARGET_LANGUAGE,
    MAX_LENGTH,
    NUM_BEAMS,
    NO_REPEAT_NGRAM_SIZE
)

from backend.services.model_loader import load_model


def translate(text):

    """
    Translate English text to isiZulu.
    """

    tokenizer, model = load_model()

    tokenizer.src_lang = SOURCE_LANGUAGE

    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True
    )

    translated_tokens = model.generate(
        **inputs,
        forced_bos_token_id=(
            tokenizer.convert_tokens_to_ids(
                TARGET_LANGUAGE
            )
        ),
        max_length=MAX_LENGTH,
        num_beams=NUM_BEAMS,
        no_repeat_ngram_size=NO_REPEAT_NGRAM_SIZE,
        early_stopping=True
    )

    result = tokenizer.batch_decode(
        translated_tokens,
        skip_special_tokens=True
    )

    return result[0]