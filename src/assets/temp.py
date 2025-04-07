disallow = ["American 18th Century",
"American 19th Century"]

import json

with open('final_image_data.json') as json_data:
    data = json.load(json_data)
    

print(len(data))
filtered_data = [each for each in data if each["attribution"] not in disallow]
print(len(filtered_data))


with open('final_image_data.json', 'w') as f:
    json.dump(filtered_data, f)