# Week6
(interim report) I've run into some issues on both projects. 
1. For the aa meeting project, I need to re-parse the necessary information. 

### Personal Diary Project
For the personal diary project, the main learning was that I needed to set up a partition key (topic, as a string) and also a sort key (dt, as a number) in order to create a composite primary key. Following is the primary key set up I created. 

![dynamo keys set up](dynamoDB_setUp.png)

####  Result Screen from the personal diary project with dynamoDB
![dynamo](addToDynamo.png)
![query](querySucceeded.png)

I am following the following tutorial. 
https://github.com/samizdatco/ds-2020/tree/master/weekly_assignment_06
