# Fetch all price data from Binance api and put into BigQuery

This code allows you to fetch price data from Binance api and put into BigQuery

# Run and insert into your own Google BigQuery project

## Setup

If you want to insert the data in your own BigQuery project, download your credentials (JSON) from the Google Admin Console, and export the path to your credentials file:

### OSX 

```
export GOOGLE_APPLICATION_CREDENTIALS="[PATH]"
```

### Windows

Powershell:

```
$env:GOOGLE_APPLICATION_CREDENTIALS="[PATH]"
```

Command Prompt:

```
set GOOGLE_APPLICATION_CREDENTIALS=[PATH]
```

## OSX Sample

```
export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/[FILE_NAME].json"
```

More information:
https://cloud.google.com/docs/authentication/getting-started

> Now modify `config.js` to configure your BigQuery connection and set what data you want to fetch. This is the only file which needs to be modified to download price data for asset of choice

# Create schema

Run `node applySchema.js` This will create table for you. Table name is determined based on `config.js` file. BigQuery project and dataset needs to be created in advance.

**WARNING!** If table you want to create already exists, the table, schema and data will be **REMOVED**!

# Insert data

You can invoke the script from a node enabled environment. If you are running Windows it will be probably required to run Node.js command promot in administrator mode, so it is able to read your environment variables and access BigQuery credentials
