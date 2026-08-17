
import os
import re

directory = "src/components"
pattern = re.compile(r"price:\s*`GBP\s+[^\w\s{<]*\${")

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith(".tsx") or file.endswith(".ts"):
            path = os.path.join(root, file)
            try:
                with open(path, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                
                new_content = pattern.sub(r"price: `GBP \u00A3${", content)
                
                if new_content != content:
                    with open(path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    print(f"Fixed {path}")
            except Exception as e:
                print(f"Error processing {path}: {e}")

