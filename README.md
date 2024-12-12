# Tenor20

Spice up your Roll20 chat by letting GIFs speak out your feeling instead of actual words.
Tenor20 is a Tampermonkey userscript that integrates GIF search functionality powered by the Tenor API into Roll20.


## Installation

1. **Install Tampermonkey**:
   - [Tampermonkey Web Browser Extension](https://www.tampermonkey.net/)

2. **Add the Tenor20 Script**:
   - Open Tampermonkey and select `Create a new script`.
   - Replace the default content with the code in [`tenor20.user.js`](https://github.com/reinaldnaufal/tenor20/tenor20.user.js).
   - ***IMPORTANT!*** Replace the `YOUR_TENOR_API_KEY_HERE` with your own Tenor API KEY.
   - Save the script.

3.  **Getting a Tenor API Key**:
     - Go to [Tenor Developers](https://developers.google.com/tenor/guides/quickstart).
     - Log in or sign up for a free account.
     - Create an application to generate an API key.
     - Copy your API key and replace `YOUR_TENOR_API_KEY_HERE` in the script with your key.

4. **Activate the Script**:
   - Ensure the script is enabled in Tampermonkey.
   - Navigate to Roll20, and the "GIF" button should appear in the chat interface.


## Contribution & Modification

### Prerequisites

- Node.js (optional, for development tasks)
- A Tenor API key. You can obtain one by registering at [Tenor Developers](https://developers.google.com/tenor/guides/quickstart).

### Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed explanation of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- [Tenor API](https://tenor.com/gifapi/documentation) for providing GIF search functionality.
- [Tampermonkey](https://www.tampermonkey.net/) for enabling userscripts.

---
