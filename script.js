const calc_btn = document.querySelectorAll('.btn');
const out = document.getElementById('output');
const inp = document.getElementById('input');

calc_btn.forEach(num => {
    num.addEventListener('click', () => {

        document.getElementById('output').classList.add('nonempty');

        if(num.textContent == 'AC') {
            //clearing the output section if the input section is already empty.
            if(inp.value == '') {
                out.innerHTML = '';
                return;
            }
            //else clearing only the input section.
            inp.value = '';
            return;
        }
        if(num.textContent == '=') {
            //converting % => percentage instead of modulus operator.
            if(inp.value.includes('%')) {
                let percentage_index = inp.value.indexOf('%');
                
                let before = inp.value.slice(0, percentage_index).trim();
                let after = inp.value.slice(percentage_index + 1).trim();

                let a = parseFloat(before);
                let b = parseFloat(after);
                
                out.innerHTML = (b * a) / 100;
                return;
            }

            out.innerHTML = eval(inp.value);
            return;
        }
        if(num.textContent == '+/-') {
            let expression = inp.value;

            //finding the last number to switch the sign of.
            for(let i = expression.length - 1; i > -1; i--) {
                if(isNaN(expression[i]) && expression[i] !== '.') {
                    var last_num_index = i;
                    break;
                }
                var last_num_index = i;
            }

            if(last_num_index === 0) {
                inp.value = parseFloat(expression) * -1;
                return;
            }

            let after = expression.slice(last_num_index + 1).trim();
            let after_num = parseFloat(after) * -1;
            expression = expression.slice(0, last_num_index + 1) + '(' + after_num + ')';
            
            inp.value = expression;

            return;
        }
        if(num.textContent === '←') {
            let expression = inp.value;

            inp.value = expression.slice(0, expression.length - 1);

            return;
        }

        inp.value += num.textContent;
    })
})

