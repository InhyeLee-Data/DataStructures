# Week 7

The goal for this week is to finish parsing necessary information from all 10 aa event pages, then insert them into postgresSQL.

The work is executed step-by-step as follows. 

#### w7-aa-1 
1. Parse and Save meetingsInfo from each event into a json.

#### w7-aa-2
2. (1) Request Geocode information from TAMU geoservices using "address" information from the saved json. The Geocode is saved into a separate json file.
2. (2) Combine the two json files and create new object arrays.

#### w7-aa-3
3. Create a table with required fields in postgresSQL DB.

#### w7-aa-4
4. Insert data into this table.

#### w7-aa-5
5. Test Querying information. 
