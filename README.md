# Province Identity Card Code Lookup

A simple, interactive web tool that helps users look up the **3-digit province code** on Vietnamese Citizen Identity Cards (Căn cước – CC) and maps it to the **new province name** after the 2025 administrative mergers.

## 🚀 Live Demo

Check out the live demo: [https://www.sieu.io.vn/github/province-identity-card-code](https://www.sieu.io.vn/github/province-identity-card-code)

## ✨ Features

- **Search by CCCD Code** – Enter the first 3 digits of a CCCD number (e.g., `001`, `079`) to find the corresponding province
- **Search by Province Name** – Type the old or new province name (with or without diacritics) to find its code
- **Real-Time Suggestions** – Results appear automatically as you type (after 2 characters)
- **Detailed Result Card** – Each result shows:
  - **Old Province Name** (Tên tỉnh cũ)
  - **CCCD Code** (Mã CCCD 3 số)
  - **New Province Name** (Tỉnh mới sau sáp nhập)
  - **New Administrative Code** (Mã hành chính mới)
  - **Merge Status** (Trạng thái: Merged or Unchanged)
  - **Merged From** (Sáp nhập từ) – if applicable
- **Comprehensive Table** – A full table below the search area lists all province mappings for quick reference
- **Dark Theme** – Modern, eye-friendly dark interface
- **Responsive Design** – Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Technologies Used

- **HTML5** – Structure of the application
- **CSS3** – Dark theme styling and responsive layout
- **JavaScript (Vanilla)** – Search logic, data loading, and dynamic rendering
- **JSON** – Data storage for province mappings

## 📁 Project Structure

```
province-identity-card-code/
├── index.html                # Main HTML file
├── style.css                 # Dark theme stylesheet
├── script.js                 # Search logic and UI rendering
├── data.json                 # Province code mapping data
└── README.md                 # Project documentation
```

## 🔧 Installation & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/lemasieu/province-identity-card-code.git
   ```
2. **Navigate to the project folder**
   ```bash
   cd province-identity-card-code
   ```
   
3. **Run the application with a local server**

⚠️ Important: This project loads data from a JSON file, so you need to use a local development server instead of opening `index.html` directly in your browser to avoid CORS issues.

- **Using VS Code** – Install the "Live Server" extension, right-click on `index.html`, and select "Open with Live Server"
- **Using Python** – Run `python -m http.server` (Python 3) or `python -m SimpleHTTPServer` (Python 2) and open `http://localhost:8000`
- **Using Node.js** – Install `http-server` globally (`npm install -g http-server`) and run `http-server` in the project folder

## 🧰 How to Use

1. **Enter a search query** – Type the first 3 digits of an identity card code (e.g., `001`) or a province name (e.g., `Hà Nội`) into the search box.
2. **View results** – The tool searches the data.json file and displays a result card with:
   - The old province name
   - The identity card code
   - The new province name after the merger
   - The new administrative code
   - Merge status and origin (if applicable)
3. **Browse the full table** – Scroll down to see a comprehensive table of all province mappings.

**Search behavior:**

- The search matches against the identity card code, old province name, and new province name.
- Diacritics are ignored, so you can type Ha Noi or Hà Nội and get the same result.
- Real-time search triggers after you type at least 2 characters (with a 300ms debounce).

## 📊 Data Source

The `data.json` file contains mappings for all 63 provinces and municipalities of Vietnam, including:
- `cccd_code` – The 3-digit code on the identity card (old code)
- `old_name` – The province name before the merger
- `new_name` – The province name after the merger
- `new_code` – The new administrative code
- `merged_from` – The provinces that were merged (if applicable)

This data reflects the **2025 administrative merger** of Vietnamese provinces, where several provinces were consolidated into larger administrative units.

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request or open an Issue.
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License
This project is open-source and available under the MIT License.
