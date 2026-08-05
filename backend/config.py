"""
Application configuration settings.
"""

# Hugging Face model
MODEL_NAME = "facebook/nllb-200-distilled-600M"


# Language codes used by NLLB
SOURCE_LANGUAGE = "eng_Latn"
TARGET_LANGUAGE = "zul_Latn"


# Generation parameters
MAX_LENGTH = 200
NUM_BEAMS = 4
NO_REPEAT_NGRAM_SIZE = 3