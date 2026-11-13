# Karaoke-Queue App
The karaoke-queue is a ReactJs-based app designed to help streamline the karaoke queuing process.
---
## Features
 - Pulls responses from a google form to register queue signups. 
 - Play songs from a Youtube embed
 - Lists the queue order
 - Supports different types of queue orders

## Setup
You can install all needed dependencies by entering this command into the project directory:
```
npm run setup
```

Before running the code, you will need a service account and API credentials to access the google forms and youtube APIs respectively ([Key Setup](#key-setup)). You will also need to enter a form id as well as parsing information ([Form Setup](#form-setup)).

Running a development of the app is done by entering the following command:
```
npm run dev
```

Running a build can be done using:
```
npm run build && npm run start
```

## Key Setup
In order to create service account and api credentials, project must be registered on Google Cloud. Instructions can be found [here](https://developers.google.com/workspace/guides/create-project).

To create the needed credentials, you can follow [this](https://developers.google.com/workspace/guides/create-project) (not) detailed guide.

You will need to enable the [Youtube v3 API library](https://console.cloud.google.com/apis/library) for your API key.

The service account's email will additionally need to be granted access to the google form's responses.

The service account credentials should be placed in a file titled `service-account.env.json` located in the directory `backend/env/`. Whilst, the API key will be placed in the `backend/.env` under the field name `YOUTUBE_API_KEY`.

## Form Setup
Form ID and parsing information should be entered into `backend/env/form-info.env.json`.

In it, each question ID should be given a field name to parse an answer into a JSON. It can optionally be given 'answer translations' that simplify an answer to more digestible values.

For example, the question with ID `9ab3ed5d` can be given "vocalVersion" as a field name. The response can be given translations to turn an answer like `Karaoke/Off-vocal` into `Karaoke`.

The associated form-info would look like this:
```json
{
    "formId": "<form-id>",
    "questionIDsToFields" : {
        "9ab3ed5d" : {
            "fieldName" : "vocalVersion",
            "answerTranslations" : {
                "Karaoke/Off-vocal" : "Karaoke",
                "Normal/On-vocal" : "Normal"
            }
        }
    }
}
```

And the parsed JSON might look like so:
```json
{
    "vocalVersion" : "Vocal",

    // other data
    "entryID" : "wrjdgfsd",
    "createTime" : "some time"
}
```