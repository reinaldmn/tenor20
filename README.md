# Tenor20

Spice up your Roll20 chat by letting GIFs speak out your feeling instead of actual words.

Tenor20 is a Tampermonkey userscript that integrates GIF search functionality powered by the Tenor API into Roll20.

## Installation

1. **Install Tampermonkey**:
   - [Tampermonkey Web Browser Extension](https://www.tampermonkey.net/)

2. **Add the Tenor20 Script**:
   - Open Tampermonkey and select `Create a new script`.
   - Replace the default content with the code in [tenor20.user.js](./tenor20.user.js).
   - ***IMPORTANT!*** Replace the `YOUR_TENOR_API_KEY_HERE` with your own Tenor API KEY.
   - Save the script.

3.  **Getting a Tenor API Key**:
     - Go to [Tenor Developers](https://developers.google.com/tenor/guides/quickstart).
     - Log in or sign up for a free account.
     - Create an application to generate an API key.
     - Copy your API key and replace `YOUR_TENOR_API_KEY_HERE` in the script with your key.

4. **Activate the Script**:
   - Toggle the script enabled in Tampermonkey.
   - Go to a Roll20 game, and the "GIF" button should appear in the chat interface.

## Contribution & Modification

### Prerequisites

- Node.js
- A Tenor API key
- 
### Contributing

Found a bug or wants to add another feature?
1. Fork the repository.
2. Create a new branch.
3. Submit a pull request.

Or if you know my discord, simply message me, it's way easier.

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
