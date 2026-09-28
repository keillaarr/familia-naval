# Família Naval — App Mobile (SVPM)

Aplicativo mobile desenvolvido em **React Native** (com **Expo** e **Expo Router**) voltado para o autoatendimento e solicitações de veteranos, pensionistas e dependentes vinculados ao **Serviço de Veteranos e Pensionistas da Marinha (SVPM)**.

---

## 🎨 Identidade Visual & Padrão Institucional
* **Paleta institucional primária**: Azul Naval (`#003366`), com tons de apoio claros (`#EBF3FA`), fundo neutro refinado (`#F5F7FA`) e tipografia legível (`#222222`).
* **Header padronizado**: Cabeçalho fixo com identidade da Marinha, botão de retrocesso e ícones contextuais (`@expo/vector-icons`).
* **Cards e Microinterações**: Design system unificado com bordas arredondadas (`16px`), sombras suaves, estados de carregamento (`ActivityIndicator`) e feedback visual em modais e formulários.

---

## 📱 Principais Telas & Funcionalidades

| Módulo / Tela | Descrição | Principais Recursos |
| :--- | :--- | :--- |
| **Início / Dashboard** | Visão geral do usuário autenticado | Perfil do órgão/usuário, atalhos de autoatendimento (BP Online, Consultas, Dados Cadastrais, Declaração de Dependentes IR) e barra de navegação inferior (Início, Solicitações, Perfil). |
| **Comunicados e Informes** | Listagem de avisos do sistema | Filtro por tipo (Dependentes, Inspeção de Saúde, Geral), contador de itens e abertura via modal detalhado. |
| **Declaração Auxílio-Invalidez** | Formulário de conformidade anual (Art. 78, Decreto nº 4.307/2002) | Segmented buttons para atividade remunerada (Não Exerço / Exerço), termo obrigatório com checkbox ciente, preenchimento/bloqueio de dados cadastrais e **integração automática com ViaCEP**. |

---

## 🛠️ Tecnologias Utilizadas
* **React Native** (Cross-platform mobile)
* **Expo & Expo Router** (Roteamento baseado em arquivos e toolchain)
* **TypeScript** (Tipagem estática e segura)
* **@expo/vector-icons** (Ícones vetoriais padronizados)
* **Fetch API / ViaCEP** (Consulta automatizada de logradouro por CEP)

---

## 🚀 Como Executar o Projeto

```bash
# 1. Instale as dependências
npm install

# 2. Inicie o projeto Expo
npx expo start

# 3. Abra no aplicativo Expo Go (Android/iOS) ou em um emulador configurado.
