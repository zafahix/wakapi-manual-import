## Project Description
The wakapi-manual-import repository is a Node.js project that allows importing raw heartbeats data from WakaTime to WakApi. WakApi provides integration for importing data from WakaTime, but if someone has thousands of hours of data, it is almost certain that the import process will fail. That's why this project was created, to export raw data from WakaTime and import it in a simple way, even if there are thousands of hours of data.

## Requirements
To run this project, you need to have the following software installed:
- Node.js
- npm

## Installation
1. Clone this repository to your device.
2. Navigate to the project directory: `cd wakapi-manual-import`.
3. Install dependencies: `npm install`.

## Configuration
1. Copy the `.env.example` file and rename it to `.env`.
2. Temporarily disable the integration between WakApi and WakaTime.
3. In the WakApi `config.yml` file, change the values of `import_batch_size` to `1001` and `heartbeat_max_age` to `'99999h'`.
4. Restart the WakApi to ensure that the new configuration values are loaded.
5. Go to https://wakatime.com/settings/account and export the raw heartbeats data.
6. Save the downloaded file to this directory.
7. In the `.env` file, set the appropriate file name, API url and your API Key for WakApi.

## Running
To run the project, follow these steps:
1. Open a terminal in the project directory.
2. Run the command: `npm start`.
After the import process is complete, you can revert the changes made to the `config.yml` file and re-enable the integration between WakApi and WakaTime.

## Notes
- If you have thousands of programming hours to import, the import process may take a long time.

## License
This project is licensed under the [Apache-2.0 license](LICENSE).