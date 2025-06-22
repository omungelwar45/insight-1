# TechCorp Data Engineering Challenge

This project provides a web-based platform for harmonizing insights across various datasets. It leverages a modern frontend built using **React (TypeScript + Vite)**, backend data handling through **SQLite**, and interactive data exploration in **Jupyter Notebooks**.

## 📂 Project Structure (starter)

```
insight-harmonization-hub/
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── database/
│   └── insights.db         # SQLite database (sample seeded)
├── notebooks/
│   └── analysis.ipynb      # Starter notebook
├── index.html
├── package.json
├── bun.lockb
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🛠  Quick Start

1. **Install dependencies**

```bash
bun install   # or npm install / yarn install
```

2. **Run dev server**

```bash
bun run dev   # or npm run dev
```

3. **Launch Jupyter**

```bash
cd notebooks
jupyter notebook
```

4. **Explore the database**

```bash
sqlite3 database/insights.db
sqlite> .tables
```

## 📊 Notebook preview

The starter notebook demonstrates:

* Connecting to `insights.db`
* Loading tables with `pandas`
* Calculating simple aggregates
* Plotting with `matplotlib`

## 📑 License

MIT
![image](https://github.com/user-attachments/assets/89711765-845f-40c8-90ca-925d0163033f)
![image](https://github.com/user-attachments/assets/d8e86720-9231-4dc2-a99f-ca50a8ef42ca)
![image](https://github.com/user-attachments/assets/3adf1c99-049a-48ce-9f82-f8a9521283d6)
![image](https://github.com/user-attachments/assets/d1087e14-48ef-4f39-a4d0-7cc8e09e1463)

