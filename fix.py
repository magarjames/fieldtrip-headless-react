# -*- coding: utf-8 -*-
import re
with open('src/routes/products.$productId.tsx', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Replace pound symbol with HTML entity
content = re.sub(r'GBP [^\w\s{<]*\{', 'GBP &pound;{', content)

with open('src/routes/products.$productId.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
