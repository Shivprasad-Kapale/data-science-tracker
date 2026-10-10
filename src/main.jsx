import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import Chart from "chart.js/auto";
import {
  ArrowDownRight,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Code2,
  Database,
  Eye,
  FileChartColumn,
  FlaskConical,
  GraduationCap,
  Layers3,
  LogOut,
  Menu,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";
import "./style.css";

const ACCOUNTS = [
  { id: "shiv", name: "Shiv", role: "Learner", initials: "S", color: "sage" },
  { id: "prajakta", name: "Prajakta", role: "Learner", initials: "P", color: "lavender" },
  { id: "teacher", name: "Teacher", role: "Mentor", initials: "T", color: "peach" },
];

const QUOTES = [
  "Great things are done by a series of small things brought together. — Vincent van Gogh",
  "The secret of getting ahead is getting started. — Mark Twain",
  "It always seems impossible until it’s done. — Nelson Mandela",
  "Learning never exhausts the mind. — Leonardo da Vinci",
  "Success is the sum of small efforts, repeated day in and day out. — Robert Collier",
];

const syllabusTopic = (title, status, dueDate = "") => ({ title, status, dueDate });
const INITIAL_MODULES = [
  { id: "programming-foundation", title: "Programming Foundation", description: "Build core programming, version control, and clean project habits.", icon: Code2, color: "mint", topics: [
    syllabusTopic("Python basics: variables, loops, functions, lists, dicts, sets, tuples", "Completed"),
    syllabusTopic("Python OOP: classes, objects, inheritance, polymorphism", "Completed"),
    syllabusTopic("Python advanced: decorators, generators, comprehensions, lambda, map/filter, exception handling, file handling, modules, virtual env", "Completed"),
    syllabusTopic("Git basics: init, add, commit, push, pull, branches", "Completed"),
    syllabusTopic("GitHub: repos, README, clone, pull requests", "Completed"),
    syllabusTopic("Tkinter GUI basics", "Completed"),
    syllabusTopic("Clean coding + project structure", "Due", "2026-10-20"),
  ] },
  { id: "sql", title: "SQL", description: "Practice querying, transforming, and optimizing relational data.", icon: Database, color: "amber", topics: [
    syllabusTopic("Basic SQL: SELECT, WHERE, GROUP BY, ORDER BY, JOINs, basic subqueries", "Completed"),
    syllabusTopic("Advanced SQL: window functions — ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, SUM OVER", "Due", "2026-10-18"),
    syllabusTopic("CTEs and recursive CTEs", "Due", "2026-10-18"),
    syllabusTopic("Pivoting / unpivoting", "Due", "2026-10-20"),
    syllabusTopic("Date/time functions, string functions", "Due", "2026-10-20"),
    syllabusTopic("Query optimization, indexing, execution plans", "Due", "2026-10-22"),
    syllabusTopic("SQL practice: LeetCode / HackerRank / StrataScratch — 50+ problems", "Due", "2026-10-31"),
  ] },
  { id: "python-data-stack", title: "Python Data Stack", description: "Use Python's core data libraries to manipulate and visualize data.", icon: Layers3, color: "blue", topics: [
    syllabusTopic("NumPy: arrays, broadcasting, vectorization, indexing", "Completed"),
    syllabusTopic("Pandas: Series, DataFrame, read_csv, groupby, merge, pivot, apply", "Completed"),
    syllabusTopic("Matplotlib basics", "Due", "2026-10-28"),
    syllabusTopic("Seaborn: statistical plots, heatmaps, pairplots", "Due", "2026-10-28"),
    syllabusTopic("Plotly: interactive charts", "Due", "2026-10-30"),
    syllabusTopic("Advanced Pandas: time series, window functions, memory optimization", "Due", "2026-10-30"),
  ] },
  { id: "mathematics", title: "Mathematics for Data Science", description: "Develop the statistical, linear algebra, and calculus foundations for data science.", icon: FlaskConical, color: "purple", topics: [
    syllabusTopic("Mean, median, mode", "Completed"),
    syllabusTopic("Standard deviation, variance", "Completed"),
    syllabusTopic("Eigenvalues and eigenvectors", "Completed"),
    syllabusTopic("Probability basics: conditional probability, Bayes theorem", "Due", "2026-10-16"),
    syllabusTopic("Distributions: normal, binomial, Poisson", "Due", "2026-10-18"),
    syllabusTopic("CLT, sampling, confidence intervals", "Due", "2026-10-20"),
    syllabusTopic("Hypothesis testing, p-value, t-test, chi-square, ANOVA", "Due", "2026-10-24"),
    syllabusTopic("A/B testing", "Due", "2026-10-25"),
    syllabusTopic("Correlation vs causation", "Due", "2026-10-25"),
    syllabusTopic("Linear algebra: matrix operations, norms, SVD, projections", "Due", "2026-10-27"),
    syllabusTopic("Calculus: derivatives, partial derivatives, chain rule, gradients", "Due", "2026-10-29"),
    syllabusTopic("Optimization: gradient descent, learning rate", "Due", "2026-10-31"),
  ] },
  { id: "data-analysis", title: "Data Analysis / EDA", description: "Prepare, engineer, and explore datasets while avoiding common analysis pitfalls.", icon: Layers3, color: "blue", topics: [
    syllabusTopic("Missing values, outliers, duplicates", "Due", "2026-10-26"),
    syllabusTopic("Feature engineering, encoding, scaling", "Due", "2026-10-28"),
    syllabusTopic("Data leakage, train/validation/test split", "Due", "2026-10-29"),
    syllabusTopic("Advanced EDA: groupby, merge, pivot, apply, time series", "Due", "2026-10-30"),
    syllabusTopic("EDA case study on real dataset", "Due", "2026-11-02"),
  ] },
  { id: "visualization-bi", title: "Visualization and BI", description: "Tell clear stories with visualizations, spreadsheets, and dashboards.", icon: FileChartColumn, color: "rose", topics: [
    syllabusTopic("Matplotlib / Seaborn / Plotly revision", "Due", "2026-11-02"),
    syllabusTopic("Power BI or Tableau basics", "Due", "2026-11-05"),
    syllabusTopic("Dashboard building", "Due", "2026-11-08"),
    syllabusTopic("Excel for analytics: formulas, pivot tables, XLOOKUP, charts", "Due", "2026-10-25"),
  ] },
  { id: "machine-learning", title: "Machine Learning", description: "Learn, evaluate, and tune machine learning models with practical workflows.", icon: Target, color: "teal", topics: [
    syllabusTopic("Linear regression", "Due", "2026-11-04"),
    syllabusTopic("Logistic regression", "Due", "2026-11-05"),
    syllabusTopic("KNN, SVM, Naive Bayes", "Due", "2026-11-07"),
    syllabusTopic("Decision trees, random forest", "Due", "2026-11-09"),
    syllabusTopic("Gradient boosting, XGBoost, LightGBM", "Due", "2026-11-12"),
    syllabusTopic("Clustering: K-Means, hierarchical", "Due", "2026-11-13"),
    syllabusTopic("PCA / dimensionality reduction", "Due", "2026-11-14"),
    syllabusTopic("Model evaluation: accuracy, precision, recall, F1, ROC-AUC, RMSE, MAE", "Due", "2026-11-16"),
    syllabusTopic("Cross-validation, hyperparameter tuning", "Due", "2026-11-18"),
    syllabusTopic("Scikit-learn pipelines", "Due", "2026-11-20"),
  ] },
  { id: "deep-learning", title: "Deep Learning", description: "Get basic exposure to neural networks and deep learning architectures by December 2026.", icon: Code2, color: "mint", topics: [
    syllabusTopic("Neural networks, activation functions, backpropagation", "Due", "2026-11-25"),
    syllabusTopic("CNN basics", "Due", "2026-11-27"),
    syllabusTopic("RNN, LSTM basics", "Due", "2026-11-29"),
    syllabusTopic("Transformers basics", "Due", "2026-12-01"),
    syllabusTopic("PyTorch or TensorFlow basic", "Due", "2026-12-03"),
  ] },
  { id: "nlp", title: "NLP", description: "Build basic familiarity with text processing and transformer tooling.", icon: BookOpen, color: "purple", topics: [
    syllabusTopic("Text preprocessing, TF-IDF, word embeddings", "Due", "2026-12-05"),
    syllabusTopic("Transformer basics, Hugging Face intro", "Due", "2026-12-07"),
  ] },
  { id: "time-series", title: "Time Series", description: "Get a basic introduction to time-series analysis and forecasting.", icon: TrendingUp, color: "blue", topics: [
    syllabusTopic("Stationarity, lag features", "Due", "2026-12-08"),
    syllabusTopic("ARIMA, SARIMA, Prophet", "Due", "2026-12-10"),
  ] },
  { id: "deployment-mlops", title: "Deployment and MLOps", description: "Learn the foundations of serving, packaging, and tracking machine learning systems.", icon: Layers3, color: "amber", topics: [
    syllabusTopic("Streamlit / Flask / FastAPI", "Due", "2026-12-12"),
    syllabusTopic("Docker basics", "Due", "2026-12-14"),
    syllabusTopic("Cloud basics: AWS / GCP / Azure", "Due", "2026-12-16"),
    syllabusTopic("MLflow, GitHub Actions", "Due", "2026-12-18"),
  ] },
  { id: "big-data", title: "Big Data — optional/basic", description: "Explore introductory big-data tools as an optional learning path.", icon: Database, color: "amber", topics: [
    syllabusTopic("PySpark basics", "Due", "2026-12-20"),
    syllabusTopic("SQL on Spark, Databricks intro", "Due", "2026-12-22"),
  ] },
  { id: "dsa-interviews", title: "DSA for Interviews", description: "Weekend-only interview practice for 2–3 hours; no due date.", icon: Target, color: "teal", topics: [
    syllabusTopic("Arrays, strings, hashmaps", "Weekend practice"),
    syllabusTopic("Sorting, searching", "Weekend practice"),
    syllabusTopic("Recursion, two pointers, sliding window", "Weekend practice"),
    syllabusTopic("Basic DP", "Weekend practice"),
    syllabusTopic("LeetCode easy/medium — 100 problems", "Weekend practice"),
  ] },
  { id: "projects", title: "Projects", description: "Apply your learning through portfolio projects; no due dates.", icon: GraduationCap, color: "purple", topics: [
    syllabusTopic("Billing system using SQL, Python, Tkinter", "Completed"),
    syllabusTopic("Project 1: EDA + Dashboard", "Pending"),
    syllabusTopic("Project 2: ML end-to-end + Streamlit deployment", "Pending"),
    syllabusTopic("Project 3: NLP / Time Series / Recommendation", "Pending"),
  ] },
].map((module) => ({
  ...module,
  topics: module.topics.map((topic, index) => ({
    ...topic,
    id: `${module.id}-${index + 1}`,
  })),
}));

const INITIAL_PROGRESS = Object.fromEntries(
  ["shiv", "prajakta"].map((learnerId) => [
    learnerId,
    INITIAL_MODULES.flatMap((module) => module.topics.filter((topic) => topic.status === "Completed").map((topic) => topic.id)),
  ]),
);
const MODULES_KEY = "fieldnotes-syllabus-v3";
const PROGRESS_KEY = "fieldnotes-progress-v3";
const SESSION_KEY = "fieldnotes-session-v1";
const THEME_KEY = "data-science-course-theme-v1";
const THEME_CYCLE = ["light", "dark", "pink-black"];

function nextTheme(theme) {
  return THEME_CYCLE[(THEME_CYCLE.indexOf(theme) + 1) % THEME_CYCLE.length];
}
const SITE_PASSWORD = "jalna@123";

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.error(`Unable to read saved Fieldnotes data from "${key}".`, error);
    return fallback;
  }
}

function readModules() {
  const savedModules = readStorage(MODULES_KEY, null);
  if (!Array.isArray(savedModules)) return INITIAL_MODULES;
  return savedModules.map((module) => ({
    ...module,
    icon: INITIAL_MODULES.find((initialModule) => initialModule.id === module.id)?.icon || BookOpen,
  }));
}

function PasswordGate({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    if (password !== SITE_PASSWORD) {
      setError("That password is incorrect. Please try again.");
      return;
    }
    onUnlock();
  }

  return (
    <main className="login-page">
      <div className="login-decoration decoration-one" />
      <div className="login-decoration decoration-two" />
      <header className="login-brand">
        <div className="brand-mark"><BookOpen size={19} strokeWidth={2.2} /></div>
        <span>Data Science Course</span>
      </header>
      <section className="login-card">
        <div className="login-eyebrow"><Sparkles size={14} /> PRIVATE LEARNING SPACE</div>
        <h1>Welcome back.</h1>
        <p className="login-intro">Enter the site password to continue.</p>
        <form className="password-form" onSubmit={submit}>
          <label className="field-label" htmlFor="site-password">Password</label>
          <input
            autoComplete="current-password"
            autoFocus
            id="site-password"
            onChange={(event) => { setPassword(event.target.value); setError(""); }}
            type="password"
            value={password}
          />
          {error && <p className="password-error" role="alert">{error}</p>}
          <button className="sign-in-button" type="submit">Unlock website <ArrowRight size={17} /></button>
        </form>
      </section>
      <p className="login-footer">A shared space for curious minds <span>✳</span> Shiv &amp; Prajakta</p>
    </main>
  );
}

function LoginScreen({ onLogin, theme, onToggleTheme }) {
  const [selected, setSelected] = useState(ACCOUNTS[0]);

  function submit(event) {
    event.preventDefault();
    onLogin(selected);
  }

  return (
    <main className="login-page">
      <div className="login-decoration decoration-one" />
      <div className="login-decoration decoration-two" />
      <header className="login-brand">
        <div className="brand-mark"><BookOpen size={19} strokeWidth={2.2} /></div>
        <span>Data Science Course</span>
        <button aria-label={`Switch to ${nextTheme(theme)} theme`} className="theme-toggle" onClick={onToggleTheme} type="button">{theme === "pink-black" ? "♥" : theme === "light" ? "☾" : "☀"}<span>{theme === "light" ? "Dark" : theme === "dark" ? "Pink-black" : "Bright"}</span></button>
      </header>
      <section className="login-card">
        <div className="login-eyebrow"><Sparkles size={14} /> YOUR LEARNING, IN GOOD ORDER</div>
        <h1>A little progress,<br />every day.</h1>
        <p className="login-intro">Choose your profile to continue your data science journey.</p>
        <form onSubmit={submit}>
          <label className="field-label">Choose your account</label>
          <div className="account-picker">
            {ACCOUNTS.map((account) => (
              <button
                className={`account-option ${selected.id === account.id ? "selected" : ""}`}
                key={account.id}
                onClick={() => setSelected(account)}
                type="button"
              >
                <span className={`avatar avatar-${account.color}`}>{account.initials}</span>
                <span className="account-option-copy"><strong>{account.name}</strong><small>{account.role}</small></span>
                {selected.id === account.id && <CheckCircle2 className="account-check" size={18} />}
              </button>
            ))}
          </div>
          <button className="sign-in-button" type="submit">Continue as {selected.name} <ArrowRight size={17} /></button>
        </form>
      </section>
      <p className="login-footer">A shared space for curious minds <span>✳</span> Shiv & Prajakta</p>
    </main>
  );
}

function ProgressRing({ percent }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="ring-wrap" aria-label={`${percent}% complete`}>
      <svg viewBox="0 0 48 48" className="progress-ring">
        <circle className="ring-track" cx="24" cy="24" r={radius} />
        <circle
          className="ring-value"
          cx="24"
          cy="24"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - percent / 100)}
        />
      </svg>
      <span>{percent}%</span>
    </div>
  );
}

function AddTopicForm({ onAdd, onCancel }) {
  const [title, setTitle] = useState("");
  function submit(event) {
    event.preventDefault();
    if (title.trim()) onAdd(title.trim());
  }
  return (
    <form className="topic-add-form" onSubmit={submit}>
      <input autoFocus aria-label="New topic name" onChange={(event) => setTitle(event.target.value)} placeholder="Name this topic…" value={title} />
      <button aria-label="Save topic" className="icon-action save-action" disabled={!title.trim()} type="submit"><Check size={16} /></button>
      <button aria-label="Cancel adding topic" className="icon-action" onClick={onCancel} type="button"><X size={16} /></button>
    </form>
  );
}

function SyllabusCard({ module, index, completed, canEdit, onToggle, onAdd, onRename, onDelete, expanded, onExpand }) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const doneCount = module.topics.filter((topic) => completed.includes(topic.id)).length;
  const percent = module.topics.length ? Math.round((doneCount / module.topics.length) * 100) : 0;
  const Icon = module.icon;

  function saveRename(topic) {
    const title = editValue.trim();
    if (title && title !== topic.title) onRename(module.id, topic.id, title);
    setEditingId(null);
  }

  return (
    <article className="module-card">
      <div className="module-head">
        <div className={`module-icon icon-${module.color}`}><Icon size={20} strokeWidth={1.8} /></div>
        <div className="module-heading">
          <span className="module-kicker">MODULE {String(index).padStart(2, "0")}</span>
          <h3><button aria-expanded={expanded} className="module-title-toggle" onClick={onExpand} type="button">{module.title}</button></h3>
          <p>{module.description}</p>
        </div>
        <button
          aria-label={`${expanded ? "Collapse" : "Expand"} ${module.title}`}
          className="collapse-button"
          onClick={onExpand}
          type="button"
        >
          <ChevronDown className={expanded ? "" : "collapsed-chevron"} size={18} />
        </button>
      </div>
      <div className="module-progress-line">
        <div className="mini-progress"><span style={{ width: `${percent}%` }} /></div>
        <span>{doneCount}/{module.topics.length}</span>
      </div>
      {expanded && (
        <>
          <div className="topic-list">
            {module.topics.map((topic) => {
              const isDone = completed.includes(topic.id);
              const isEditing = editingId === topic.id;
              return (
                <div className={`topic-row ${isDone ? "topic-done" : ""}`} key={topic.id}>
                  <button
                    aria-checked={isDone}
                    aria-label={`${isDone ? "Mark incomplete" : "Mark complete"}: ${topic.title}`}
                    className={`topic-checkbox ${isDone ? "checked" : ""}`}
                    disabled={!canEdit}
                    onClick={() => onToggle(topic.id)}
                    role="checkbox"
                    type="button"
                  >
                    {isDone && <Check size={13} strokeWidth={3} />}
                  </button>
                  {isEditing ? (
                    <form className="topic-edit-form" onSubmit={(event) => { event.preventDefault(); saveRename(topic); }}>
                      <input aria-label="Edit topic name" autoFocus onChange={(event) => setEditValue(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") setEditingId(null); }} value={editValue} />
                      <button aria-label="Save changes" className="tiny-action" type="submit"><Check size={14} /></button>
                      <button aria-label="Cancel editing" className="tiny-action" onClick={() => setEditingId(null)} type="button"><X size={14} /></button>
                    </form>
                  ) : (
                    <>
                      <span className="topic-copy">
                        <span className="topic-title">{topic.title}</span>
                        <span className="topic-status">{isDone ? "Completed" : topic.status === "Completed" ? "Pending" : topic.dueDate ? `Due ${new Date(`${topic.dueDate}T00:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}` : topic.status}</span>
                      </span>
                      {canEdit && (
                        <span className="topic-actions">
                          <button aria-label={`Rename ${topic.title}`} className="tiny-action" onClick={() => { setEditingId(topic.id); setEditValue(topic.title); }} type="button"><Pencil size={14} /></button>
                          <button aria-label={`Delete ${topic.title}`} className="tiny-action delete-action" onClick={() => onDelete(module.id, topic.id)} type="button"><Trash2 size={14} /></button>
                        </span>
                      )}
                    </>
                  )}
                </div>
              );
            })}
            {adding && <AddTopicForm onAdd={(title) => { onAdd(module.id, title); setAdding(false); }} onCancel={() => setAdding(false)} />}
          </div>
          {canEdit && !adding && (
            <button className="add-topic-button" onClick={() => setAdding(true)} type="button"><Plus size={15} /> Add a topic</button>
          )}
        </>
      )}
    </article>
  );
}

function Dashboard({ user, onLogout, modules, setModules, progress, setProgress, theme, onToggleTheme }) {
  const [search, setSearch] = useState("");
  const [activeNav, setActiveNav] = useState(user.id === "teacher" ? "My progress" : "Syllabus");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [viewedUserId, setViewedUserId] = useState(user.id === "prajakta" ? "prajakta" : "shiv");
  const [expandedModules, setExpandedModules] = useState({});
  const [quoteIndex, setQuoteIndex] = useState(0);
  const overallChartRef = React.useRef(null);
  const moduleChartRef = React.useRef(null);
  const canEdit = user.id !== "teacher";
  const canEditViewed = canEdit && viewedUserId === user.id;
  const trackedUserId = viewedUserId;
  const trackedUser = ACCOUNTS.find((account) => account.id === trackedUserId);
  const completed = progress[trackedUserId] || [];
  const allTopics = modules.flatMap((module) => module.topics);
  const total = allTopics.length;
  const doneCount = allTopics.filter((topic) => completed.includes(topic.id)).length;
  const percent = total ? Math.round((doneCount / total) * 100) : 0;
  const studentStats = useMemo(() => ACCOUNTS.filter((account) => account.id !== "teacher").map((student) => {
    const studentProgress = progress[student.id] || [];
    const studentCompleted = allTopics.filter((topic) => studentProgress.includes(topic.id)).length;
    return {
      ...student,
      completed: studentCompleted,
      percent: total ? Math.round((studentCompleted / total) * 100) : 0,
      modules: modules.map((module) => {
        const moduleCompleted = module.topics.filter((topic) => studentProgress.includes(topic.id)).length;
        return {
          ...module,
          completed: moduleCompleted,
          percent: module.topics.length ? Math.round((moduleCompleted / module.topics.length) * 100) : 0,
        };
      }),
    };
  }), [modules, progress]);
  const classAverage = studentStats.length
    ? Math.round(studentStats.reduce((sum, student) => sum + student.percent, 0) / studentStats.length)
    : 0;
  const filteredModules = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return modules;
    return modules.flatMap((module) => {
      const moduleMatches = module.title.toLowerCase().includes(query);
      const topics = moduleMatches
        ? module.topics
        : module.topics.filter((topic) => topic.title.toLowerCase().includes(query));
      return topics.length ? [{ ...module, topics }] : [];
    });
  }, [modules, search]);

  useEffect(() => {
    localStorage.setItem(MODULES_KEY, JSON.stringify(modules.map(({ icon, ...module }) => module)));
  }, [modules]);
  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }, [progress]);
  useEffect(() => {
    const timer = window.setInterval(() => setQuoteIndex((current) => (current + 1) % QUOTES.length), 5000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    if (activeNav !== "My progress" || !overallChartRef.current || !moduleChartRef.current) return undefined;
    const colors = ["#72977b", "#a28ab6"];
    const darkChart = theme !== "light";
    const chartText = theme === "pink-black" ? "#f2c7df" : "#c1c9bf";
    const chartGrid = theme === "pink-black" ? "#503348" : "#39433a";
    const overallChart = new Chart(overallChartRef.current, {
      type: "bar",
      data: {
        labels: studentStats.map((student) => student.name),
        datasets: [{
          label: "Syllabus completed",
          data: studentStats.map((student) => student.percent),
          backgroundColor: colors,
          borderRadius: 7,
          maxBarThickness: 62,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, max: 100, ticks: { stepSize: 25, color: darkChart ? chartText : "#73796f", callback: (value) => `${value}%` }, grid: { color: darkChart ? chartGrid : "#eef0eb" } },
          x: { ticks: { color: darkChart ? chartText : "#73796f" }, grid: { display: false } },
        },
        color: darkChart ? chartText : "#73796f",
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: (context) => `${context.parsed.y}% complete` } } },
      },
    });
    const moduleChart = new Chart(moduleChartRef.current, {
      type: "radar",
      data: {
        labels: modules.map((module) => module.title),
        datasets: studentStats.map((student, index) => ({
          label: student.name,
          data: student.modules.map((module) => module.percent),
          borderColor: colors[index],
          backgroundColor: index === 0 ? "rgba(114,151,123,.14)" : "rgba(162,138,182,.13)",
          pointBackgroundColor: colors[index],
          pointRadius: 3,
          borderWidth: 2,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: { color: darkChart ? chartText : "#73796f", stepSize: 25, backdropColor: "transparent", callback: (value) => `${value}%` },
            grid: { color: darkChart ? chartGrid : "#e9ece6" },
            angleLines: { color: darkChart ? chartGrid : "#e9ece6" },
            pointLabels: { color: darkChart ? chartText : "#73796f", font: { size: 10 } },
          },
        },
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${context.parsed.r}%` } } },
      },
    });
    return () => {
      overallChart.destroy();
      moduleChart.destroy();
    };
  }, [activeNav, modules, studentStats, theme]);

  function toggleTopic(topicId) {
    setProgress((current) => {
      const userCompleted = current[user.id] || [];
      const nextCompleted = userCompleted.includes(topicId)
        ? userCompleted.filter((id) => id !== topicId)
        : [...userCompleted, topicId];
      return { ...current, [user.id]: nextCompleted };
    });
  }

  function addTopic(moduleId, title) {
    const id = `${moduleId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setModules((current) => current.map((module) =>
      module.id === moduleId ? { ...module, topics: [...module.topics, { id, title, status: "Pending", dueDate: "" }] } : module
    ));
  }

  function renameTopic(moduleId, topicId, title) {
    setModules((current) => current.map((module) =>
      module.id === moduleId
        ? { ...module, topics: module.topics.map((topic) => topic.id === topicId ? { ...topic, title } : topic) }
        : module
    ));
  }

  function deleteTopic(moduleId, topicId) {
    setModules((current) => current.map((module) =>
      module.id === moduleId ? { ...module, topics: module.topics.filter((topic) => topic.id !== topicId) } : module
    ));
    setProgress((current) => Object.fromEntries(
      Object.entries(current).map(([id, topics]) => [id, topics.filter((topic) => topic !== topicId)])
    ));
  }

  const navItems = [
    { title: "Syllabus", icon: BookOpen },
    { title: user.id === "teacher" ? "Class progress" : "Shared progress", icon: TrendingUp },
  ];
  const progressView = activeNav !== "Syllabus" && activeNav !== "3 months roadmap";

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <a className="brand" href="#" onClick={(event) => { event.preventDefault(); setActiveNav("Syllabus"); setLearningView("Syllabus"); }}>
          <span className="brand-mark"><BookOpen size={18} strokeWidth={2.2} /></span>
          <span className="brand-name">Data Science Course</span>
        </a>
        <div className="workspace-label">YOUR WORKSPACE</div>
        <button className="workspace-switcher" onClick={() => { setActiveNav("Syllabus"); setLearningView("Syllabus"); }} type="button">
          <span className="workspace-glyph">ds</span>
          <span><strong>Data Science</strong><small>Learning path</small></span>
          <ChevronDown size={15} className="workspace-chevron" />
        </button>
        <div className="sidebar-section-label">LEARN</div>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map(({ title, icon: Icon }) => (
            <button className={`nav-item ${(title === "Syllabus" ? !progressView && learningView === "Syllabus" : progressView) ? "nav-active" : ""}`} key={title} onClick={() => { setActiveNav(title === "Syllabus" ? "Syllabus" : "My progress"); if (title === "Syllabus") setLearningView("Syllabus"); setMobileMenu(false); }} type="button">
              <Icon size={17} strokeWidth={1.9} />
              <span>{title}</span>
              {title !== "Syllabus" && <span className="nav-count">{percent}%</span>}
            </button>
          ))}
          {canEditViewed && <button className={`nav-item ${learningView === "3 months roadmap" && !progressView ? "nav-active" : ""}`} onClick={() => { setActiveNav("Syllabus"); setLearningView("3 months roadmap"); setMobileMenu(false); }} type="button"><CalendarDays size={17} strokeWidth={1.9} /><span>3 months roadmap</span></button>}
        </nav>
        <div className="sidebar-section-label modules-nav-label">YOUR MODULES</div>
        <nav className="module-nav" aria-label="Syllabus modules">
          {modules.map((module, index) => (
            <div className="module-nav-group" key={module.id}>
              <button aria-expanded={Boolean(expandedModules[module.id])} className="module-nav-item" onClick={() => setExpandedModules((current) => ({ ...current, [module.id]: !current[module.id] }))} type="button">
                <ChevronDown className={expandedModules[module.id] ? "" : "collapsed-chevron"} size={13} />
                <span className={`module-nav-dot dot-${module.color}`} />
                <span>{String(index).padStart(2, "0")}</span>
                <span className="module-nav-name">{module.title}</span>
              </button>
              {expandedModules[module.id] && <div className="module-subtopic-nav">
                {module.topics.map((topic) => <button key={topic.id} onClick={() => { setActiveNav("Syllabus"); setLearningView("Syllabus"); window.requestAnimationFrame(() => document.getElementById(`module-${module.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" })); setMobileMenu(false); }} type="button">{topic.title}</button>)}
              </div>}
            </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="tip-card"><Sparkles size={15} /><p><strong>Small steps count.</strong><br />Consistency beats cramming, every time.</p><ArrowDownRight size={15} /></div>
          <div className="sidebar-user">
            <span className={`avatar avatar-${user.color}`}>{user.initials}</span>
            <span className="sidebar-user-copy"><strong>{user.name}</strong><small>{user.role}</small></span>
            <button aria-label="Sign out" className="logout-button" onClick={onLogout} title="Sign out" type="button"><LogOut size={16} /></button>
          </div>
        </div>
      </aside>

      {mobileMenu && <button aria-label="Close menu" className="mobile-scrim" onClick={() => setMobileMenu(false)} type="button" />}
      <main className="main-panel">
        <header className="topbar">
          <button aria-label="Open menu" className="mobile-menu-button" onClick={() => setMobileMenu(true)} type="button"><Menu size={20} /></button>
          <div className="breadcrumbs"><span>Learning path</span><ChevronRight size={14} /><strong>{learningView === "3 months roadmap" && !progressView ? "3 months roadmap" : activeNav}</strong></div>
          <div className="topbar-right">
            {user.id === "teacher" && <span className="observer-badge"><Eye size={13} /> Mentor view</span>}
            <span className="topbar-date"><Clock3 size={14} /> Your own pace</span>
            <button aria-label={`Switch to ${nextTheme(theme)} theme`} className="theme-toggle" onClick={onToggleTheme} type="button">{theme === "pink-black" ? "♥" : theme === "light" ? "☾" : "☀"}<span>{theme === "light" ? "Dark" : theme === "dark" ? "Pink-black" : "Bright"}</span></button>
            <button aria-label="Sign out" className="topbar-logout" onClick={onLogout} title="Sign out" type="button"><LogOut size={17} /></button>
          </div>
        </header>
        <div aria-live="polite" className="quote-strip"><Sparkles size={15} /><span>{QUOTES[quoteIndex]}</span><span className="quote-timer">A LITTLE INSPIRATION</span></div>

        <div className={`page-content ${learningView === "3 months roadmap" && !progressView ? "roadmap-view" : ""}`}>
          <section className="welcome-row">
            <div>
              <div className="date-eyebrow">YOUR DATA SCIENCE ROADMAP <span>✳</span></div>
              <h1>{progressView ? (user.id === "teacher" ? "Class progress overview." : "Shared progress.") : learningView === "3 months roadmap" ? "Your three-month roadmap." : user.id === "teacher" ? `${trackedUser.name}’s progress.` : <>Good to see you, {user.name}<span className="welcome-dot">.</span></>}</h1>
              <p className="welcome-subtitle">
                {user.id === "teacher"
                  ? progressView ? "Compare Shiv and Prajakta’s overall and module-by-module progress." : `Read-only syllabus and progress for ${trackedUser.name}.`
                  : progressView ? "See your progress alongside your friend’s. Peer progress is view-only." : canEditViewed ? "One topic at a time. You’re building something good." : `Viewing ${trackedUser.name}’s progress. Their checkboxes are read-only.`}
              </p>
            </div>
            {user.id === "teacher" && !progressView ? (
              <label className="welcome-badge observe-picker">
                <Eye size={15} />
                <span className="sr-only">Choose learner to observe</span>
                <select aria-label="Choose learner to observe" onChange={(event) => setViewedUserId(event.target.value)} value={viewedUserId}>
                  {ACCOUNTS.filter((account) => account.id !== "teacher").map((account) => <option key={account.id} value={account.id}>{account.name}’s progress</option>)}
                </select>
                <ChevronDown size={14} />
              </label>
            ) : user.id !== "teacher" && !progressView ? (
              <label className="welcome-badge observe-picker">
                <Eye size={15} />
                <span className="sr-only">Choose whose progress to view</span>
                <select aria-label="Choose whose progress to view" onChange={(event) => setViewedUserId(event.target.value)} value={viewedUserId}>
                  {ACCOUNTS.filter((account) => account.id !== "teacher").map((account) => <option key={account.id} value={account.id}>{account.id === user.id ? `${account.name} (you)` : account.name}</option>)}
                </select>
                <ChevronDown size={14} />
              </label>
            ) : !progressView ? (
              <div className="welcome-badge"><GraduationCap size={17} /><span>2025–26 cohort</span></div>
            )}
          </section>

          <section className="overview-grid" aria-label="Syllabus progress summary">
            <div className="overview-card progress-overview">
              <div className="overview-copy"><span className="overview-label">{user.id === "teacher" && progressView ? "CLASS AVERAGE" : "OVERALL PROGRESS"}</span><strong>{user.id === "teacher" && progressView ? classAverage : percent}<span>%</span></strong><small>{user.id === "teacher" && progressView ? `${studentStats.reduce((sum, student) => sum + student.completed, 0)} of ${total * studentStats.length} topics completed` : `${doneCount} of ${total} topics completed`}</small></div>
              <ProgressRing percent={user.id === "teacher" && progressView ? classAverage : percent} />
              <div className="overview-bar"><span style={{ width: `${user.id === "teacher" && progressView ? classAverage : percent}%` }} /></div>
            </div>
            <div className="overview-card">
              <span className="overview-label">LEARNING PATH</span>
              <div className="overview-stat">{modules.length}<span className="stat-unit"> modules</span></div>
              <div className="overview-foot"><span className="stat-dot stat-dot-green" />A thoughtfully ordered curriculum</div>
            </div>
            <div className="overview-card">
              <span className="overview-label">TOPICS TO EXPLORE</span>
              <div className="overview-stat">{user.id === "teacher" && progressView ? total * studentStats.length - studentStats.reduce((sum, student) => sum + student.completed, 0) : total - doneCount}<span className="stat-unit"> left to learn</span></div>
              <div className="overview-foot"><span className="stat-icon"><CheckCircle2 size={14} /></span>Every checkmark is a small win</div>
            </div>
          </section>

          {!progressView && learningView === "Syllabus" && canEditViewed && (
            <>
              <section className="learning-plan-grid" aria-label="Personal learning plan">
                <article className="plan-card weekly-goal-card">
                  <span className="overview-label">WEEKLY GOAL</span>
                  <div className="weekly-goal-control">
                    <strong>{weeklyCompleted}<span> / </span><input aria-label="Topics per week goal" disabled={!canEditViewed} max="100" min="1" onChange={(event) => setPlans((current) => ({ ...current, [user.id]: { ...(current[user.id] || {}), weeklyGoal: Math.max(1, Math.min(100, Number(event.target.value) || 1)) } }))} type="number" value={weeklyGoal} /></strong>
                    <span>topics completed this week</span>
                  </div>
                  <div className="mini-progress"><span style={{ width: `${Math.min(100, Math.round((weeklyCompleted / weeklyGoal) * 100))}%` }} /></div>
                  <small>{weeklyCompleted >= weeklyGoal ? "Weekly goal reached — great work!" : `${Math.max(weeklyGoal - weeklyCompleted, 0)} more to reach your goal`}</small>
                </article>
                <article className="plan-card milestone-card">
                  <span className="overview-label">UPCOMING MILESTONE</span>
                  {nextMilestone ? (
                    <div className="milestone-content">
                      <CalendarDays size={19} />
                      <div><strong>{nextMilestone.label}</strong><span>{nextMilestone.kind} · {new Date(`${nextMilestone.date}T00:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span></div>
                      {nextMilestone.date < today && <span className="overdue-label">Overdue</span>}
                    </div>
                  ) : <p className="no-milestone">Set a module or phase due date to see your next milestone here.</p>}
                </article>
              </section>
            </>
          )}

          {progressView ? (
            <section className="syllabus-section">
              <div className="section-heading">
                <div><span className="section-kicker">SIDE-BY-SIDE COMPARISON</span><h2>How we’re getting on</h2></div>
                <span className="read-only-tag">{user.id === "teacher" ? "Teacher overview" : "Everyone’s progress is visible"}</span>
              </div>
              <div className="comparison-grid">
                {studentStats.map((student) => (
                  <article className="comparison-card" key={student.id}>
                    <div className="comparison-card-head">
                      <span className={`avatar avatar-${student.color}`}>{student.initials}</span>
                      <strong>{student.name}</strong>
                      <span className="comparison-percent">{student.percent}%</span>
                    </div>
                    <div className="sum-note">{student.completed} of {total} topics completed</div>
                    <div className="bar"><span style={{ width: `${student.percent}%` }} /></div>
                    <div className="comparison-modules">
                      {student.modules.map((module) => (
                        <div className="comparison-module" key={module.id}>
                          <span>{module.title}</span>
                          <div className="bar"><span style={{ width: `${module.percent}%` }} /></div>
                          <strong>{module.percent}%</strong>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
              <div className="analytics-grid">
                <article className="chart-card">
                  <h3>Overall completion</h3><p>Percentage of the full syllabus completed</p>
                  <div className="chart-legend"><span><i className="legend-dot" />Shiv</span><span><i className="legend-dot legend-prajakta" />Prajakta</span></div>
                  <div className="chart-wrap"><canvas aria-label="Bar chart comparing overall completion for Shiv and Prajakta" ref={overallChartRef} role="img" /></div>
                </article>
                <article className="chart-card">
                  <h3>Progress by module</h3><p>Compare each learner’s completion percentage for every module</p>
                  <div className="chart-legend"><span><i className="legend-dot" />Shiv</span><span><i className="legend-dot legend-prajakta" />Prajakta</span></div>
                  <div className="chart-wrap"><canvas aria-label="Radar chart comparing Shiv and Prajakta module progress" ref={moduleChartRef} role="img" /></div>
                </article>
              </div>
            </section>
          ) : learningView === "3 months roadmap" ? (
            <section className="roadmap-section" aria-label="Three-month course roadmap">
              <div className="section-heading"><div><span className="section-kicker">YOUR COURSE PLAN</span><h2>3 months roadmap</h2></div></div>
              <div className="roadmap-grid simple-roadmap">
                {ROADMAP_PHASES.map((phase, phaseIndex) => {
                  const phaseModules = modules.filter((_, index) => getModulePhase(index, modules.length) === phaseIndex);
                  return (
                    <article className="roadmap-card" key={phase}>
                      <div className="roadmap-card-heading"><span className="roadmap-month">{phase}</span><label><CalendarDays size={14} /><span className="sr-only">{phase} due date</span><input aria-label={`${phase} due date`} disabled={!canEditViewed} onChange={(event) => updatePlanField("phaseDueDates", `phase-${phaseIndex + 1}`, event.target.value)} type="date" value={plan.phaseDueDates?.[`phase-${phaseIndex + 1}`] || ""} /></label></div>
                      <ul>{phaseModules.map((module) => <li key={module.id}><span>{module.title}</span></li>)}</ul>
                    </article>
                  );
                })}
              </div>
            </section>
          ) : (
          <section className="syllabus-section">
            <div className="section-heading">
              <div><span className="section-kicker">THE CURRICULUM</span><h2>{activeNav === "My progress" ? "Your learning path" : "The syllabus"} <span className="section-count">{modules.length} modules</span></h2></div>
              <div className="section-tools">
                <label className="search-box">
                  <Search size={16} />
                  <input aria-label="Search syllabus" onChange={(event) => setSearch(event.target.value)} placeholder="Find a topic…" value={search} />
                  {search && <button aria-label="Clear search" onClick={() => setSearch("")} type="button"><X size={14} /></button>}
                </label>
                {canEdit && <span className="editable-hint"><Pencil size={13} /> Editable</span>}
              </div>
            </div>
            {filteredModules.length ? (
              <div className="modules-grid">
                {filteredModules.map((module) => {
                  const originalIndex = modules.findIndex((item) => item.id === module.id);
                  return (
                    <div id={`module-${module.id}`} key={module.id}>
                      <SyllabusCard
                        canEdit={canEditViewed}
                        completed={completed}
                        expanded={Boolean(expandedModules[module.id])}
                        index={originalIndex}
                        module={module}
                        dueDate={plan.moduleDueDates?.[module.id]}
                        note={plan.notes?.[module.id]}
                        onDueDateChange={(moduleId, value) => updatePlanField("moduleDueDates", moduleId, value)}
                        onNoteChange={(moduleId, value) => updatePlanField("notes", moduleId, value)}
                        onReview={updateReview}
                        review={plan.reviews || {}}
                        onAdd={addTopic}
                        onDelete={deleteTopic}
                        onExpand={() => setExpandedModules((current) => ({ ...current, [module.id]: !current[module.id] }))}
                        onRename={renameTopic}
                        onToggle={toggleTopic}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state"><Search size={22} /><strong>No topics found</strong><span>Try a different search, or clear the search field.</span></div>
            )}
          </section>
          )}
          <footer className="page-footer"><span>Made for the long way round.</span><span>Keep going <span className="footer-sparkle">✳</span></span></footer>
        </div>
      </main>
    </div>
  );
}

function CourseApp() {
  const [user, setUser] = useState(() => {
    const saved = readStorage(SESSION_KEY, null);
    if (!saved) return null;
    const account = ACCOUNTS.find((item) => item.id === saved.id);
    return account ? { id: account.id, name: account.name, role: account.role, initials: account.initials, color: account.color } : null;
  });
  const [modules, setModules] = useState(readModules);
  const [progress, setProgress] = useState(() => readStorage(PROGRESS_KEY, INITIAL_PROGRESS));
  const [plans, setPlans] = useState(() => readStorage(PLAN_KEY, {}));
  const [activity, setActivity] = useState(() => readStorage(ACTIVITY_KEY, {}));
  const [theme, setTheme] = useState(() => {
    const savedTheme = readStorage(THEME_KEY, "light");
    return THEME_CYCLE.includes(savedTheme) ? savedTheme : "light";
  });

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.removeItem("data-science-course-passwords-v1");
    } catch (error) {
      console.error("Unable to remove the old saved password data.", error);
    }
  }, []);

  function login(account) {
    const session = { id: account.id, name: account.name, role: account.role, initials: account.initials, color: account.color };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  function toggleTheme() {
    setTheme((current) => {
      const next = nextTheme(current);
      document.body.dataset.theme = next;
      localStorage.setItem(THEME_KEY, JSON.stringify(next));
      return next;
    });
  }

  return user
    ? <Dashboard user={user} onLogout={logout} modules={modules} setModules={setModules} progress={progress} setProgress={setProgress} plans={plans} setPlans={setPlans} activity={activity} setActivity={setActivity} theme={theme} onToggleTheme={toggleTheme} />
    : <LoginScreen onLogin={login} theme={theme} onToggleTheme={toggleTheme} />;
}

function App() {
  const [unlocked, setUnlocked] = useState(false);
  return unlocked ? <CourseApp /> : <PasswordGate onUnlock={() => setUnlocked(true)} />;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>,
);
