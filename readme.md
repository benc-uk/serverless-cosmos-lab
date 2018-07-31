---
title: Cognitive Services Lab
---

# Introduction
This is a hands on lab guide for Azure. In this lab you will deploy a serverless application which uses Azure Cognitive Services to analyze photos gathered from twitter. An Azure Logic App drives the process and carries out most of the tasks. 

The Logic App flow is:
- Calls the Twitter API and searches for tweets containing a certain hashtag
- Calls the Azure cognitive service API for each photo and gets the result which is a description of the contents of the photo
- Stores the result in Azure Cosmos DB

The Azure cognitive service uses a pre-trained computer vision model to return results describing the image as a JSON object. Cosmos DB is a No-SQL database, which the Logic App uses to store the results as JSON documents, one for each photo result.

The final part of the application is a simple web app, written in Node.js. This web app is hosted in Azure as an Web App Service, it connects to Cosmos DB and displays the photo analysis results as a simple web page.

The guide steps through deploying and configuring the complete end to end solution in Azure

# Solution Architecture
![arch](arch.png)


# High Level Steps
1. Create a new resource group
2. Create a Computer Vision API account
3. Create a new Cosmos DB account
4. Create a database and collection in Cosmos DB
5. Create a Logic App
6. Connect Logic App to Twitter
7. Connect Logic App to Cosmos DB 
8. Test and verify
9. Create a new Web App
10. Connect Web App to Cosmos DB
11. View results :)


# Main Step by Step Guide
The guide consists of step by step instructional videos, taking you through setting up the whole application solution end to end. It will take approx an hour to run through the lab

Below is an embedded YouTube playlist with all 8 videos. [This is a direct link to the playlist](https://www.youtube.com/playlist?list=PLhnSSylQTB-nVzRyAYJm8oe1VaVL9C7yW)

<iframe width="100%" height="680" src="https://www.youtube.com/embed/videoseries?list=PLhnSSylQTB-nVzRyAYJm8oe1VaVL9C7yW" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
