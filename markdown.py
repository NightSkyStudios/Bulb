import re

source = """
 __italic__

**bold**

`monospace`

---

"""

marks = {
    'italic': '',
    'bold': '',
    'monospace': '',
    'hr': ''
}

parags = re.compile('\n{2,}')

mathes = parags.findall(source)

