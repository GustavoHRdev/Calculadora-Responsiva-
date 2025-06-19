# Calculadora Responsiva com Tema Noturno Profissional

## Descrição

Este projeto é uma calculadora funcional e estilizada, desenvolvida com foco na melhor experiência do usuário em qualquer dispositivo, seja desktop ou mobile. O tema é noturno e profissional, com cores escuras e tons neon, que proporcionam uma interface elegante e agradável para uso contínuo.

A calculadora conta com botões responsivos, animações suaves no hover e lógica robusta que previne erros comuns.

## Problema que precisei resolver

Muitas calculadoras simples encontradas online não possuem uma interface responsiva, o que dificulta o uso em dispositivos móveis. Além disso, temas escuros muitas vezes têm problemas de contraste e usabilidade. Também percebi a necessidade de criar uma lógica que evitasse bugs como múltiplos pontos decimais, divisão por zero e falhas na interação do usuário.

## Como resolvi

- Utilizei **CSS Grid** com unidades responsivas (`clamp()`, `vw`, `vh`) para criar um layout que se adapta a várias telas.
- Criei um tema noturno usando gradientes escuros e tons neon, garantindo alto contraste e elegância.
- Implementei animações suaves nos botões (transformações e sombras) para melhorar o feedback visual.
- Desenvolvi a lógica em **JavaScript puro**, tratando casos como múltiplos pontos, divisão por zero, backspace e reset.
- Usei uma organização clara com arquivos separados: `index.html`, `style.css` e `script.js`.
- Adicionei uma pequena **media query** para telas muito pequenas, garantindo boa usabilidade mesmo em smartphones compactos.

## Tecnologias usadas

- HTML5  
- CSS3 (Grid, variáveis CSS, unidades responsivas)  
- JavaScript ES6+

## Como usar

1. Abra o arquivo `index.html` em qualquer navegador moderno.  
2. Utilize os botões para inserir números, operações e calcular resultados.  
3. O botão `C` limpa toda a entrada, e `←` apaga o último caractere.  
4. A interface se adapta automaticamente a diferentes tamanhos de tela.

## Próximos passos

- Implementar suporte a entrada pelo teclado físico.  
- Adicionar histórico de operações.  
- Melhorar acessibilidade (ARIA e suporte a leitores de tela).
