# Upphandlingscenter APPENDIX 2. REQUIREMENTS SPECIFICATION FOR LOCAL OPERATION

|No|Claim|
|---|---|
|1.1|It should be possible to run the system on Windows Server 2022 and later versions or Ubuntu Linux 22.04 or later.|
|1.2|It should be possible to run the system virtually, based on VMware 7.x and later versions.|
|1.3|It should be possible to get an account of which server environment incl. components with version numbers that are optimal for the system solution.|
|1.4|It must be possible to get the Supplier's requirements for processing power, internal memory and disk capacity to the system solution's server platform.|
|1.5|The tenderer must explain how backups are taken of the system solution (the application incl. affected components). Backup must be possible at least once per day.|

# Basic requirements database

|No|Claim|
|---|---|
|2.1|It should be possible to run the system's database in MS SQL Server 2022 and later versions.|
|2.2|It should be possible for the system to work without higher rights than DBowner in the database.|
|2.3|It should be possible to get a specification for how the database/databases are optimally configured in your system solution.|
|2.4|It should be possible to get a specification for how backup should be taken of the system solution's database.|
|2.5|It must be possible to run the client or a server on the DMZ via an application server to the database. Not directly to database.|
|2.6|It should be possible for the system to support the use of domain accounts between system and database as an authentication method.|
---
# APPENDIX 2. REQUIREMENTS SPECIFICATION FOR LOCAL OPERATION

# 3. Basic requirements client

|No|Claim|
|---|---|
|3.1|It must be possible to run the system on clients based on MS Windows 10 and later versions.|
|3.2|If the system uses a browser, it should be possible to run the system in the Edge or Chrome browser.|
|3.3|It must be possible to obtain a specification for the hardware requirements (processing power, internal memory, disk capacity, etc.) that the proposed system solution places on the client computer.|
|3.4|It must be possible to deploy the local client via Microsoft System Center Configuration Manager.|
|3.5|It should be possible to get specification of product name with version if the system requires 3rd party products.|
|3.6|Bold client: Upon delivery, the system must be able to connect to the directory service (Active Directory) using LDAPS or Kerberos. If the requirement for multi-factor exists, the system must be able to log in with Smart Card, type Nexus.|
|3.7|In web-based parts, upon delivery, the system must be able to be connected to an IdP (Identity Provider) with at least the SAML 2.0 standard or OpenID Connect without additional development, cost or being associated with any monthly costs.|
|3.8|If there is a mobile application for the system, this must, upon delivery, support the OAuth 2.0 standard or OpenID Connect, or at least SAML 2.0 without additional development, cost or be associated with any monthly costs.|
|3.9|It must be possible to feed the system automatically with users from the directory service AD using LDAP, API or via csv file.|
|3.10|Web-based traffic must use TLS 1.2 or later.|

# 4. Documentation

|No|Claim|
|---|---|
|4.1|The supplier must provide system documentation for the implemented system in Borlänge municipality (when Borlänge municipality operates Säter) with an associated schematic image. In the documentation, ports must be specified and in which|
---
# APPENDIX 2. REQUIREMENTS SPECIFICATION FOR LOCAL OPERATION

direction the communication takes place. Installed services must be documented.