# nestorbird_sql_assessment

## Introduction
This project is a survey application where the next question depends on the response of the current question. The responses will be stored anonymously.

## Schema structure
- Each question will have 4 options.
- Each question will have a question id and each option will have a option id.
- Option id of the selected option will be the question id of the next quetion.
- The last set of questions will have 'submit' keyword in thier option id. 
- Each selected option id will stored in response, seprated by '#'.

## Prerequisites

Before you start, ensure you have the following installed:
- Node.js
- npm (Node Package Manager)
- PostgreSQL

#### Installing Node.js and npm

1. Go to [Node.js official website](https://nodejs.org/).
2. Download the installer for your operating system. You should download the LTS (Long Term Support) version recommended for most users.
3. Run the installer (the .msi file for Windows or .pkg for macOS) and follow the instructions to install Node.js and npm.

### Installing PostgreSQL

This project interacts with a PostgreSQL database, so you'll need to have PostgreSQL installed on your system. You can download and install PostgreSQL from the official PostgreSQL website: https://www.postgresql.org/download/

### Installing node modules (Express, pg and cors)

```bash
npm update
```

## Setup

### Step 1 : Clone the repo:

Use command:
```bash
git clone https://github.com/abhi-146/nestorbird_sql_assessment.git
```

cd to cloned folder.

### Step 2: Create the database

Use command:
```bash
psql 
```

The above command will enter into postreSQL shell. Then use command:
```bash
CREATE DATABASE databse_name;
```

### Step 3: Run server.js

```bash
node server.js
```

- This will create tables 'questions' and 'responses' in the specified database. Also, it will add demo questions.
- This will initialise three endpoints:
    - '/question' to get all the questions. 
    - '/question:id' to get the question with the specified id. 
    - '/responses' to insert the response. 

### Step 4: Run index.html

Run index.html in any browser.

## Note: 
Change credentials to connect the database in server.js at line 9

```bash
const connectionString = 'postgresql://username:password@host:port/database_name';
```
