# Tenor20

Spice up your Roll20 chat by letting GIFs speak out your feeling instead of actual words.
Tenor20 is a Tampermonkey userscript that integrates GIF search functionality powered by the Tenor API into Roll20.

## Installation

1. **Install Tampermonkey**:
   - [Tampermonkey Web Browser Extension](https://www.tampermonkey.net/)

2. **Add the Tenor20 Script**:
   - Open Tampermonkey and select `Create a new script`.
   - Replace the default content with the code in `tenor20.user.js`.
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

## Disclaimer

Although everything is made client-side, I can not guarantee that Roll20 is a-okay with this script.
Using this script in Roll20 may violate the platform's Terms of Service. Roll20 does not officially support or endorse third-party scripts, and the use of this userscript could potentially result in account restrictions or bans. Therefore:
1. Use this script only in private games with trusted players.
2. Avoid using the script in public or official Roll20 games.
3. Ensure you understand and comply with Roll20's Terms of Service.
4. Use at your own risk.


## Acknowledgments

- [Tenor API](https://tenor.com/gifapi/documentation) for providing GIF search functionality.
- [Tampermonkey](https://www.tampermonkey.net/) for enabling userscripts.
