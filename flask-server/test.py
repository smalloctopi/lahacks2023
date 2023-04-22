clean_text = open("clean_transcribed.txt", "r", encoding="utf-8")
text = clean_text.read()
split = text.split()
print(len(split))

dirty_text = open("dirty_transcribed.txt", "r", encoding="utf-8")
text2 = dirty_text.read()
split2 = text2.split()
print(len(split2))
