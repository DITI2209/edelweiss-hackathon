# Options Chain Tool

This project aims to build an Options Chain Tool that processes real-time market data and calculates various metrics, such as Implied Volatility (IV), to display an options chain screen. The tool will provide a user-friendly web interface where users can select underlying assets, different expiry dates, and filter options based on specific criteria.

## Link to video and Ppt
https://drive.google.com/drive/folders/1eye0Nb1EXfRYmb4X4srEs6XlIWtqMcGt?usp=drive_link

## Table of Contents

- [Introduction](#introduction)
- [Problem Statement](#problem-statement)
- [Project Components](#project-components)
- [Features](#features)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Installation](#installation)


## Introduction

An option is a derivative product commonly used in trading. It has associated Greeks and can be either a call option or a put option. This project aims to provide a comprehensive options chain tool that allows users to analyze options data in real-time.

## Problem Statement

The goal of this project is to process market data received over a TCP/IP connection and calculate Implied Volatility (IV) and other relevant metrics. The options chain screen should be displayed as a webpage, similar to platforms like [NSE India Option Chain](https://www.nseindia.com/option-chain). The following requirements should be fulfilled:

- Highlight "in the money" and "out of the money" options differently.
- Provide the ability to select different underlying assets and expiry dates.
- Ensure real-time functionality, where the options chain is updated dynamically as the market data changes, without requiring page reloads.

For Implied Volatility (IV) calculation, the Black Scholes Formula can be used. The following assumptions can be made:

1. Use the Black Scholes Formula for calculating IV from options price.
2. Assume a risk-free interest rate of 5%.
3. To calculate Time To Maturity (TTM) accurately, assume the expiry time to be at 15:30 IST on the expiry day. After the contract expires, TTM will be negative, implying IV as 0.
4. Since options are derivatives of underlying assets, an underlying price will also be published in the same market data stream.

## Project Components

This project comprises three main components:

1. **Dockerized Jar File and Dataset**: A Docker container is set up to stream market data, which is received at a frequency of every 5 seconds (speed = 12). The data stream contains relevant information about options and their underlying assets.

2. **Python Server (Flask)**: A Python Flask server connects to the Dockerized Jar File using socket programming. It continuously receives packets from the data stream and filters them. The filtered packets are stored in a pandas dataframe. The server then preprocesses the dataframe to extract necessary information from each packet. The change and implied volatility are calculated using mathematical formulas. Finally, the server connects to the client using socket programming and sends the dataframe as an array of JSON objects.

3. **React Client (Frontend)**: The client is a React application that receives the dataframe from the server as an array of objects. It displays the options chain data in the form of a table through a socket connection with the server. The client provides three tables for calls, puts, and futures, respectively. The options chain highlights the in-the-money and out-of-the-money options. Users can filter the table based on expiry date, strike price, or indexes. The table automatically refreshes every 5 seconds. Additionally, users have the option to download the table data as a CSV file and view a chart of strike price vs. implied volatility.

## Features

- Real-time options chain display.
- Selection of underlying assets and different expiry dates.
- Highlighting of in-the-money and out-of-the-money options.
- Filtering options chain based on expiry date, strike price, or indexes.
- Automatic table refresh without page reloads.
- Option to download options chain data as a CSV file.
- Chart visualization of strike price vs. implied volatility.

## Usage

To use the Options Chain Tool, follow these steps:

1. Install the necessary dependencies (see [Dependencies](#dependencies)).
2. Set up the Docker container with the market data streaming jar file.
3. Start the Python Flask server.
4. Launch the React client.
5. Access the options chain tool via the provided web interface.
6. Select underlying assets, choose expiry dates, and apply filters as desired.
7. Observe the real-time options chain display and make use of the available features.

## Dependencies

The following dependencies are required to run this project:

- Docker
- Python (3.6+)
- Flask
- React
- Pandas

## Installation

To install and set up the Options Chain Tool, follow these steps:

1. Clone the project repository.
2. Install Docker on your system.
3. Set up the Docker container using the provided jar file and dataset.
4. Install Python (3.6+) and set up a virtual environment (optional but recommended).
5. Install the necessary Python packages using pip or conda (e.g., `pip install flask`).
6. Navigate to the Flask server directory and start the server.
7. Install React and its required packages by navigating to the client directory and running `npm install`.
8. Launch the React client using the `npm start` command.
9. Access the options chain tool via the provided web interface.


