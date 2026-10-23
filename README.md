# 🧠 AI Visual Learning Hub — Step-by-Step Concepts & Papers

Welcome to **`my_notes`** — an interactive, visual-first AI & Deep Learning knowledge base designed to break down complex AI concepts and landmark research papers into **intuitive mental models, interactive animations, color-coded toy math, and clean PyTorch code**.

---

## 🚀 Quick Access Links

- 📋 **[Master Learning Plan (`PLAN.md`)](./PLAN.md)** — Our 5-step visual teaching philosophy, templates, and architecture.
- 🌐 **[Live Interactive GitHub Pages Portal (`index.html`)](https://robertnanda.github.io/my_notes/)** — Browse the interactive dashboard, search topics, and track your completion progress.

---

## 📚 Available Modules

### 🧠 Topic #1: Self-Attention (The Heart of Transformers)
> *How do words in a sentence dynamically figure out which other words matter most to their meaning? Learn how **Query ($Q$)**, **Key ($K$)**, and **Value ($V$)** vectors work together step by step.*

- 📖 **[Read Step-by-Step Visual Notes on GitHub (`topics/self-attention/notes.md`)](./topics/self-attention/notes.md)** *(Works directly inside GitHub with Mermaid flowcharts & LaTeX math!)*
- 🎮 **[Launch Interactive Visual Playground (`topics/self-attention/index.html`)](https://robertnanda.github.io/my_notes/topics/self-attention/)** *(Live interactive sentence attention matrix, 5-stage visual stepper, worked $2\times 2$ toy math, and flip flashcards!)*

| # | Module | Category | Difficulty | GitHub Markdown Notes | Interactive Web Lesson |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **01** | **Self-Attention ($Q, K, V$)** | `Foundations • Transformers` | 🟢 Beginner-Friendly | [📖 `notes.md`](./topics/self-attention/notes.md) | [🎮 Launch Interactive Page](https://robertnanda.github.io/my_notes/topics/self-attention/) |
| *02* | *Attention Is All You Need (2017)* | `Research Paper` | 🟡 Intermediate | *Ask in chat to unlock* | *Ready on request* |

---

## 🎨 The 5-Step Visual Framework

Every concept and research paper in this repository follows a consistent, zero-fluff progression:

1. **💡 Step 1 — The Big Picture & Analogy**: Plain-English intuition and real-world mental models before introducing any equations.
2. **🎮 Step 2 — Interactive Visualization**: Clickable sentence heatmaps, sliders, and **Next / Previous** visual steppers to watch tensors transform in real time.
3. **🏗️ Step 3 — Deconstructed Architecture**: Clear Mermaid.js diagrams and visual flowcharts showing exact tensor shapes at every stage.
4. **🎨 Step 4 — Color-Coded Toy Math**: Every variable is color-coded (<kbd>Query = Cyan</kbd>, <kbd>Key = Amber</kbd>, <kbd>Value = Green</kbd>, <kbd>Attention = Purple</kbd>) and computed by hand using small $2\times 2$ numbers.
5. **💻 Step 5 — Minimal Code & Flashcards**: 20–30 lines of heavily commented PyTorch code plus active-recall flashcards to lock in understanding.

---

## 🗂️ Repository Structure

```text
my_notes/
├── index.html                        # 🌐 Main GitHub Pages interactive dashboard
├── PLAN.md                           # 📋 Master pedagogical plan & templates
├── README.md                         # 📖 GitHub repository home page (you are here)
├── assets/
│   ├── css/
│   │   └── style.css                 # 🎨 Shared dark/light UI theme & Q/K/V color tokens
│   └── js/
│       └── core.js                   # ⚡ Theme toggle, search/filter, progress bar, flashcards
└── topics/
    └── self-attention/
        ├── index.html                # 🎮 Interactive Self-Attention playground & stepper
        └── notes.md                  # 📖 Complete GitHub-native Markdown notes & diagrams
```

---

## ⚙️ How to Enable GitHub Pages (1-Minute Setup)

If the live web links (`https://robertnanda.github.io/my_notes/`) are not active yet on your repository:

1. Go to your repository on GitHub: **[`https://github.com/RobertNanda/my_notes`](https://github.com/RobertNanda/my_notes)**
2. Click **Settings** (top navigation tab) $\rightarrow$ **Pages** (left sidebar).
3. Under **Build and deployment** $\rightarrow$ **Source**, select **Deploy from a branch**.
4. Under **Branch**, choose **`main`** and folder **`/ (root)`**, then click **Save**.
5. Wait ~60 seconds and visit **[https://robertnanda.github.io/my_notes/](https://robertnanda.github.io/my_notes/)**!
