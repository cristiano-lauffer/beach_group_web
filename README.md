# ADR 1: BeachGroup - Gerenciamento de quadras de beach tennis* **Status:** Aceito* **Data:** 2026-08-21* **Decisores:** Cristiano Serafim, Daniel Rodrigues, Vitória Fortes

## 1. Contexto
A aplicação requer uma interface Web desacoplada para consumir a Web API desenvolvida em .NET 10.
O prazo de entrega do projeto é de 8 semanas. A equipe possui conhecimento prévio em HTML/
JavaScript básico, bem como C#.

## 2. Opções Consideradas
* *Opção 1 (Angular):* Oferece uma estrutura robusta e padronizada, mas possui uma curva de
aprendizado alta exigindo TypeScript estrito e Injeção de Dependência.

* *Opção 2 (React):* Altamente popular e flexível, porém exige a montagem manual da pilha de
bibliotecas (roteamento, formulários) e o aprendizado de JSX e estado funcional.

* *Opção 3 (Vue.js 3 - Composition API):* Oferece reatividade simples via Proxies, excelente
documentação oficial e integração nativa com o Vue Router sem necessidade de bibliotecas externas
complexas.

## 3. Decisão
Escolhemos o *React*, pois alguns dos componentes do grupo tem conhecimento prévio e sua fexibilidade de trabalho.

## 4. Consequências
### Positivas:
* Rapidez no desenvolvimento da interface (curva de aprendizado rápida).

* Código HTML/CSS fácil de manter e entender por todos os integrantes do grupo.
* Ótimo para utilização de blocos reutilizáveis
### Negativas / Riscos (Trade-offs):
* Mitigação: Utilizaremos Swagger para produtividade e testes em tempo de desenvolvimento
