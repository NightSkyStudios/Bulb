    const parse = Range.prototype.createContextualFragment.bind(document.createRange());

    function parseLink(markString) {
        let args = markString.replace('[', '').replace(']', '').split('|')
        let innerHTML = args[0]
        let href = args[1]
        let style = `link-${args[2]}` || ''
        return `<a href="${href}" class="link ${style}">${innerHTML}</a>`
    }

    function getHTML(substring, type) {
        switch(type){
            case 'italic':
                return `<i>${substring.replace(/_/g, '')}</i>`
            case 'bold':
                return `<b>${substring.replace(/\*/g, '')}</b>`
            case 'monospace':
                return `<code>${substring.replace(/\`/g, '')}</code>`
            case 'hr':
                return `<hr>`
        }
    }

    function parseText(text) {
        const types = ['italic', 'bold', 'monospace', 'hr']
        const regs = {
            'italic': /_\S*_/gi,
            'bold': /\*\*\S*\*\*/gi,
            'monospace': /`\S*`/gi,
            'hr': /---/gi,
        }

        let results = {}

        types.forEach((type) => {
            let r = text.match(regs[type])
               if(r){
                   results[type] = r
               }

        })

        for(let type in results){
            results[type].forEach(match =>{
                text = text.replace(match, getHTML(match, type))
            })
        }

        //text = text.replace('/\n/gi', '<br>')

        let result =''
        let paragraphs = text.split(/\n{2,}/gi)
        paragraphs.forEach(par => {
            result += `<p>${par}</p>`
        })

        return result
    }

    function Generate() {
        let raw = document.getElementById('text').value
        console.log(raw)
        let target = document.getElementById('result')
        target.innerHTML = ''
        target.appendChild(parse(parseText(raw)))
        parseText(raw)
    }