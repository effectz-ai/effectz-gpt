# Upphandlingscenter APPENDIX 1. REQUIREMENTS SPECIFICATION FALUN BORLANGE REGIONEN

Requirements specification case management system Säter-Dalarna building unit

# System requirements

|No|Claim|
|---|---|
|1.1|The system must be usable for registration and diary keeping of documents, matters, objects (or activities).|
|1.2|The system must support scanner integration according to a standardized format where PDF/A is used for image capture and storage.|
|1.3|All system functions must be in Swedish.|
|1.4|All documentation from the supplier must be delivered digitally by PDF or other means that the Orderer wishes.|
|1.5|All user and system documentation must follow the current version of the system, the Supplier is responsible for ensuring that this is updated.|
|1.6|All documentation must be in Swedish.|
|1.7|The supplier must independently and continuously monitor changes in legislation.|
|1.8|The system must follow and support current laws and regulations that municipalities must follow in the handling of documents and cases. Governing legislation includes, among others, the Freedom of the Press Ordinance, the Municipal Act, the Administration Act, the Publicity and Confidentiality Act, the Archives Act, the Planning and Building Act.|
|1.9|The system must comply with the National Archives' regulations and general advice regarding storage, information, standards, documentation, etc|
|1.10|The municipalities' graphic profiles must be able to be used in the documents created in the IT system.|
|1.11|Existing data in ongoing cases must be converted to the new IT system in the requested format. This is stated in Appendix 6. Conversion (The supplier must, together with the customer, convert all cases according to Appendix 6. Conversion)|
---
# APPENDIX 1. REQUIREMENTS SPECIFICATION

1.12 In terms of volume, within the scope of the submitted tender and requested documentation, the system must allow an unlimited number of users, diary units, matters, documents and documents.

1.13 Drag-and-drop technology or a similar work-simplifying function must be available to easily move documents from the inbox or file manager to the various cases/parts of the system.

# Functional requirements

|No|Claim|
|---|---|
|2.1|The system must be able to retrieve all current property information directly from the property register that the municipality uses.|
|2.2|It must be possible to import and export data from at least the following sources: XML, DWG, DOCX, XLSX, PDF, PDF/A, TXT, TIFF, PNG, JPEG and the most common video formats.|
|2.3|The system must have a function for mobile work with a mobile phone, laptop, tablet or similar.|
|2.4|There must be functions in the system that allow users, selected events and documents in a case to be compiled digitally for export, e-mail or printing.|
|2.5|The status of cases must be able to be changed depending on where in the case process the case is (for example ongoing, cancelled, closed, archived, order for completion, case complete or equivalent). The status of the case must be presented and shown in the case view.|
|2.6|In the system, it must be possible to set monitoring linked to the date of the case.|
|2.7|Current cases must be displayed for the respective case manager.|
|2.8|The following information must be searchable in the system: - Property designation - Applicant - Case number|
---
# APPENDIX 1. REQUIREMENTS SPECIFICATION

• The start and end dates of the case or event• Decision number (paragraph and delegation number respectively)• Note• Case meaning• Case status• Case manager• Case type• Case class• Interesting• Event header

# 2.9

It should be possible to have an approval process/send for review within the system. Notice then goes to reviewers with a link to the document.

# 2.10

There should be mass update function. This means that a change of, for example, the responsible administrator or a change in the event title should be possible for several cases at the same time.

# 3. E-mail

No Claim3.1 It must be possible to send out and receive e-mail including attachments in the IT system. E-mail including its attachments recorded in the IT system must retain the same information and formatting (except for the change that must be made to make it archive-resistant).3.2 It should be possible to send e-mail directly from the matter.

# 4. IT requirements

No Claim4.1 See attachments- Requirements IT cloud solution- Requirements IT - local operation

# 5. Permissions

No Claim5.1 Users with special authorization must be able to add, change and delete users as well as grant and change user identities
---
# APPENDIX 1. REQUIREMENTS SPECIFICATION

|5.2|Users with special authorization must be able to move documents and events between cases.|
|---|---|
|5.3|The roles should be able to be combined to provide different extended permissions.|
|5.4|In the system, it must be possible to retrieve information about active and inactive users. It must also be possible to retrieve the user's authorizations.|
|5.5|Changes (including configuration changes) in the system must be logged so that it is clear what was changed, who made the changes and when it happened.|

# 6. Fees and charges

|No Claim| |
|---|---|
|6.1|The customer must be able to enter the accepted rate into the system on their own as support when collecting the fee.|

# 7. Integration

|No Claim| |
|---|---|
|7.1|The system must have functions that support data export to the municipality's e-archive.|
|7.2|The system must be able to connect invoice documents created in the system to the municipality's overall invoicing system.|
| |Today, the municipality of Säter uses the accounting system Unit4 Business (Agresso).|
|7.3|When linking invoice documents created in the system to the municipality's overall invoicing system, it should be possible to check the invoice document before the transfer to the financial system is made.|
|7.4|The system must have support for being able to show which neighboring properties exist based on a property designation in a building permit. Property information (legal owner and address) must be displayed in the system.|
|7.5|The system must be able to be integrated with the Customer's map system.|
|7.6|Integration with the business system that instantly registers changes made in the e-services, without any manual input.|
---
# APPENDIX 1. REQUIREMENTS SPECIFICATION

Changes to the e-service from applicants must update the business system automatically. For example: Notification that the applicant wants to change contact details and/or controller. Information on changing agent/contact person. Revise already submitted documents (additional documents to the case but change on the customer's own initiative). As for documents, they must be submitted as a document in an event. As for the other points, information in one event is sufficient. Administrators must receive notification of new events. The purpose is that events on the customer's initiative should be visible to the administrator at once and without anyone having to register 'manually'.

|7.7|The system must have links to civil registration registers.|
|---|---|
|7.8|The system must be able to be integrated with the land surveyor's property register. On request, the tenderer must also be able to report for which property registers the product can be integrated against.|
|7.9|Conversion of data and installation on a new database should be carried out in connection with the completion of the procurement.|
|7.10|The IT system must have an HTTP-based API (SOAP, REST or similar) for both reading and writing information. The interface description for the API must be open and based on open standards.|
|7.11|All functions (read, add new, update/change existing and delete case) in the IT system should be able to be implemented via API, which also includes messages and status changes. API|
|7.12|The supplier must provide the version management of the APIs used.|
|7.13|The cost of access to the API must be included in the total cost and have no volume limitation, either in terms of data or number of integrations.|

# Search function and reports

8.1
In the system, there must be detailed search functions that enable searches from at least property, matters, documents, events and contacts.
---
# APPENDIX 1. REQUIREMENTS SPECIFICATION

|8.2|It should be possible to navigate to any search hit from the search function by selecting a search hit in the hit list and getting there directly.|
|---|---|
|8.3|Among other things, it should be possible to obtain a list of:|
| |• Surveillances|
| |• Made delegation decisions during a given period of time|
| |• Cases received during a given time period|
| |• Documents received during a given time period|
| |• Ongoing cases|
| |• Cases that have been closed and are still in the system|
| |• All cases on a property|
| |• Ongoing and closed cases per case manager|
| |• Content list/document list per case|
| |• Mailing lists|
| |• JK list|
|8.4|It should be possible to obtain a list or the equivalent of statistics to be reported to Statistics Sweden and the Housing Authority.|
|8.5|There should be a function for making selections based on the lists or search results and exporting the selection to Excel for further manual processing.|
|8.6|You must be able to monitor cases by specifying deadlines for processing cases, documents and documents. Automatic reminder shall be sent out to users any number of days before the deadline expires. Deadlines should ideally be registered automatically.|
|8.7|The monitoring function must be linked to one / more users and be able to display overdue monitoring.|

# Digital case management

|No|Claim|
|---|---|
|9.1|The system must have functions for completely digital case management.|
|9.2|The system must have the function to stamp arrival, decision stamp and sign documents digitally.|
|9.3|It must be possible to create automatic events in the system. The customer must control what is to be carried out automatically. For example, if a decision is created with linked|
---
# APPENDIX 1. REQUIREMENTS SPECIFICATION

9. Requirements for System Functionality

|No|Requirement|
|---|---|
|9.4|There must be a viewing cabinet connected to the system where other units within the municipality must be able to search for a case in the system and be able to see and take part in documents, events and notes.|
|9.5|When creating decisions in the system that are to be announced in Post- and Inrikes newspapers, a list must automatically be created for announcement. It must also be possible to transfer the information to PoIT and create an automatic announcement event in the system.|
|9.6|It must be possible to visualize a process overview with the support of events in the system. The customer must be able to control which events are to be visualized.|
|9.7|When a delegation decision is drawn up, it must automatically be assigned a unique decision number. It must also be possible to set a decision prefix or the equivalent.|
|9.8|When a new case is registered, it must automatically be assigned a unique diary number. Diary numbers must include the current year, numbering and be in running chronological order.|
|9.9|The system must support connection to digital mailboxes. For example, Kivra, My government post, E-Boks and Digimail.|

10. Document Management

|No|Claim|
|---|---|
|10.1|When keeping a diary, incoming documents and prepared documents must be able to be converted to archive-resistant file formats without losing information.|
|10.2|It must appear in the system on all events and matters who is the administrator.|
|10.3|It must be clearly stated in the system whether a document is being worked on or completed (created, kept in a diary). It must also be stated whether the document has been received or dispatched.|
|10.4|Created and dispatched documents must be locked in the system and can only be changed by users with special authorization.|
---
# APPENDIX 1. REQUIREMENTS SPECIFICATION

|10.5|A digital stamp must be available for all documents in the system. The stamp must contain at least the date, diary number, paragraph number, the name of the delegate and the name of the authority.|
|---|---|
|10.6|It must be possible to register independent events in the IT system.|
|10.7|It must be possible to register independent documents in the IT system.|
|10.8|It should be possible to create a case from a property designation in the system.|
|10.9|In the system, it must be possible to create, change and use a free number of own templates for at least MS word.|
|10.10|It must be possible to perform a spell check, in Swedish, on documents and templates in the system.|
|10.11|The system must have a function for selectable connections to templates for automatic transfer of data to documents.|
|10.12|It should be possible to create phrases in the system, which can be used for both e-mail and templates.|
|10.13|A document must be readable by an authorized person without it being locked to other users.|

# E-service

|No|Claim|
|---|---|
|11.1|The IT system must be able to handle and deliver e-services.|
|11.2|The e-service must be linked to the operation of the IT system. For example, the same case types/case sentences must exist in the e-service as in the IT system.|
|11.3|The e-service must be directly connected to the IT system. A case must be created in the IT system when the applicant enters information into the e-service.|
|11.4|In the e-service, the applicant/co-applicant/contact person via e-identification must be able to apply for a permit, notification, advance notice, new construction map or beach protection.|
---
# APPENDIX 1. REQUIREMENTS SPECIFICATION

|11.5|In the e-service, the controller must be able to via e-identification:|
|---|---|
| |- access their (connected via social security number) ongoing cases including documents|
| |- Complete the cases it is connected to|
| |- Take part in decisions|

|11.6|In the e-service, the affected property owner/neighbors must be able to via e-identification:|
|---|---|
| |- access documents in the matter to which they are connected|
| |- submit an opinion or state that they have nothing to comment on|

11.7 The e-services must be able to be updated with an e-service for supervision according to PBL and an e-service for coastal protection dispensation according to the Environmental Code.

11.8 The IT system must support e-services either with its own e-service platform or via integration with the municipality's e-service platform. Säters municipality has OpenE Platform.

11.9 E-tjänst must inform its users about cookies and request consent or approval to store the information in accordance with applicable laws (OSL, GDPR, etc.).

# Automation

No Claim

12.1 The system must have a service for functions for rule management of cases and dispatches and more.

# Service measurement

No Claim

13.1 The system should have a function that enables ongoing measurement of the municipality's service when exercising
---
# APPENDIX 1. REQUIREMENTS SPECIFICATION

|No|Claim|
|---|---|
|14.1|The system must have a function for registering mandatory ventilation controls.|
|14.2|The system must have the function where actors can register performed function checks.|

|No|Claim|
|---|---|
|15.1|The system must have an integrated map in its interface.|
|15.2|The system's integrated map must be able to read a background map published as a WMS from a system freely chosen by the municipality.|

|No|Claim|
|---|---|
|16.1|There must be a function that allows the inspectors to work outside, for example on a construction site, and be able to take notes/create protocols during a workplace visit. The inspector should not have to bring his computer, but should be able to do this via phone or tablet. Everything that happens on site must be directly stored in the IT system. When connection cannot take place, storage must take place directly on the mobile device. The device must automatically sync with the IT system when the device is connected.|

|No|Claim|
|---|---|
|17.1|It must be possible to store completed cases in the system.|
|17.2|The IT system must have functions that support data export to a suitable file format for long-term storage, or that information.|
---
# APPENDIX 1. REQUIREMENTS SPECIFICATION

is stored in future-proof formats right from the start. Export of information packages must be able to be carried out by the customer without extensive measures and additional costs from the supplier. Information must be able to be exported as one of the following or equivalent:

- FGS Package Structure (National Archives' administrative common specifications)
- Comma or tab separated excel file

17.3 The IT system must support the export and archiving of data and associated metadata.

17.4 Structural context, for example an object or a property, must be able to be maintained even when exporting and archiving data.

17.5 The IT system must support the thinning of certain information according to established thinning deadlines in the document management plan. Thinning refers to the destruction of public documents. The IT system must have functionality to sift through case information and files in the IT system. Authorized users must be able to specify when in time a thinning can be carried out (thinning deadline).

17.6 Cases must be able to be resolved in whole or in part. Users with special authorization must be able to mark one or more cases whose culpable information is to be culled.

17.7 The system must be able to generate reports showing what has been thinned, who thinned and when it was thinned (certificate of thinning).

17.9 During an export, files and attachments must be understandable and separated and not dependent on a folder structure.

17.10 Marking for confidentiality and personal data must be translatable to the following levels: 0 No confidentiality, 1 Weak confidentiality, 2 Strong confidentiality. 0 No personal data, 1 Harmless personal data, 2 Privacy-sensitive personal data.

17.11 The IT system must comply with the National Archives' regulations and general advice on technical requirements for electronic documents (RA-FS 2009:02)

17.12 The IT system must support established FGSs for different information types https://riksarkivet.se/faststallda-kommande-fgser
---
# APPENDIX 1. REQUIREMENTS SPECIFICATION

|18. Committee (Political documents)|No Claim|
|---|---|
|18.1 Matters and documents must be able to be packaged and labeled for committee handling.| |

|19. Secrecy|No Claim|
|---|---|
|19.1 It must be possible to classify matters, events and documents as confidential. It must be stated in the system if the object, activity, facility, matter or documents contain information with confidentiality and what authorization is required to have access to the information.| |
|19.2 The system must support handling of data related to individuals with protected personal data. ("Protected personal data" is the Swedish Tax Agency's collective heading for the various protective measures confidentiality marking, overwriting and falsified personal data in the population register.)| |
|19.3 Only users with special authorization should be able to read and edit confidential matters.| |

|20. Information security|No Claim|
|---|---|
|20.1 The supplier must have ensured that responsibilities and tasks that conflict with each other and can lead to abuse are separated.| |
|20.2 The supplier must have established contacts with the authorities affected by the delivery.| |
|20.3 The supplier must have a policy that describes how the employees are allowed to work remotely regarding operation, management and support of the delivered services.| |
|20.4 The supplier must have processes and routines in place for relevant background checks of personnel.| |
|20.5 The supplier must have a confidentiality agreement with its employees. The duty of confidentiality must include information.| |
---
# APPENDIX 1. REQUIREMENTS SPECIFICATION

|No|Claim|
|---|---|
|20.6|The supplier must regularly conduct training for its staff to increase awareness of information security and keep up-to-date on the client's policies, rules and procedures.|
|20.7|The supplier must have clear and communicated measures for violations of information security rules.|

# Other technical requirements

|No|Claim|
|---|---|
|21.1|The IT system must be able to work against the server environment remotely, i.e. via a leased connection where the delay can amount to a maximum of 20 ms (milliseconds).|

# User support

|No|Claim|
|---|---|
|22.1|The supplier must provide Swedish-language user documentation in the form of web-based manuals or equivalent documents (on the web) free of charge.|
|22.2|The handbook must, at no additional cost, be updated by the supplier in the event of changes.|

# Help functions, error handling

|No|Claim|
|---|---|
|23.1|There must be a help function in Swedish in the system.|
|23.2|The function for help must be able to be influenced by authorized users so that the organization's own help text can be entered.|
|23.3|It must be possible to search in the help function.|
|23.4|The system's help function must work so that the user comes directly to the help section that deals with the parts the user is working with/marking.|
---
# APPENDIX 1. REQUIREMENTS SPECIFICATION

23.5  The system must have adequate error messages expressed in plain text and in Swedish. The error messages must inform the user about what has gone wrong, is missing or has been filled in incorrectly.