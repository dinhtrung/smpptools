# SMPP Simulation Tools

### Summary

A SMPP traffic simulation tools for pre-sales and sales department, that easy to setup, bring up and deploy for demonstration purpose.

### Main Features

- User Friendly Web Interface: the application main function can be access and interactive via browser.
- SMPP Functional Testing Features: 
	- ESME Connection Management: To manage ESME connections available to the system
	- SMPP Parameters Management: To manage SMPP PDU payload that is difficult to understand for sales ppl, and re-use this parameter sets for demonstration purpose.
	- SMSC Simulation: To bootstrap a SMSC to act as an upstream for other ESME to connect to.
- SMPP Performance Testing:
	- ESME Stress Test: Start bulk SMS sending from any Account / Connections towards target SMSC
	- SMSC Delivery Receipt: Mimic SMSC Delivery Receipt features, with custom delay and success ratio
	- SMSC Mobile Originated SMS: To simulate Mobile Originated SMS from Person towards Applications


### User Manual

A sales representative wants to have a demo sessions for SMPP gateway system with following agenda:

1. ESME Connection management:
	1. Create ESME account: 
		1. Open ESME Connections tab, and press Create button
		1. Fill in SMPP Account info (systemID, password, IP, port, Bind Mode) and press Save
	1. Start and Stop the ESME connection:
		1. On ESME Connection listing page, press the Start button of one account to bring up new connection for this ESME account.
		1. A notification messages appears to tell User if connection is success or failed.
		1. To display all active connection, user navigate to Active ESME Connections panel.
		1. To stop an active connection, user can press the Stop button associate with it.
		1. To view the statistics on this connection, user can press the View button associate with it. Basic information like total number of PDU send out, current sending TPS etc can be show on screen.
	1. Delete ESME connection:
		1. From ESME Connection management page, user can delete any profiles any time.
		1. From Active ESME Sessions tab, user can stop the running connection any time.
1. ESME Feature Testing:
	1. From Active ESME Sessions page, user click on Feature Testing button to open the Feature Testing page
	1. In Feature Testing page, User can manually fill in the SMPP parameters for SMS submission.
		1. Basic Parameters tab: Source (Address, TON, NPI), Destination (Address, Ton, NPI), Text content
		1. Advanced Parameters:
			- Flash SMS
			- Scheduled Delivery
			- Validity Period
			- Short Message (hex dump in case Sales want to test out special features)
			- Optional TLV
			- Special UDH
	1. After fill in SMPP parameters, user press the Submit Message button to send the message out on current connection.
	1. To re-use all the parameter, user click on Save As button save the current SMPP parameter into a SMPP Preset
	1. To load existing preset, user click Load Preset button and choose a preset to load from.
1. ESME Stress Testing:
	1. From Active ESME Sessions listing page, user click on Stress Test button to visit Stress Test page
	1. On Stress Test panel, user can upload a list of phone numbers, choose a SMPP Preset, then press Import button to load the file contents into system.
	1. On Stress Test panel, user can set the sending out TPS, click on Start button to start the stress testing process.
	1. On Stress Test panel, user can view the current TPS, number of SMS send out, number of Delivery Receipt received divide by status.
1. SMSC Simulation:
	1. User navigate to SMSC Management page to show list of SMSCs
	1. To create new SMSC, user press the Create SMSC button, fill in the SMPP features this SMSC have, and press Save:
		- Accept Ratio: The ratio to return OK back to SubmitSM PDU
		- Delivery Receipt Success Ratio: The ratio on each state of DLR
		- SystemID, Password, Rate Limit: The information for authenticate the ESME, and rate limit its speed.
		- Port: Control the TCP port this SMSC listen to.
	1. To start the SMSC, user press the Start button on list of SMSC.
	1. To control the SMSC behavior at any time, user click on the Settings button, change the parameters, and press Save to adjust the settings.
	1. User press Active Sessions button to show the SMSC current active SMPP Sessions. In this listing, user can press Blacklist button on any ESME connection to prevent connection from ESME's IP.
	1. User press on Reports button to show the current SMSC metrics, including number of PDU sent, received, error ratio, etc
	1. To test out one particular SMPP session, user click on one of the active SMPP Sessions to open it's Testing page
		1. To send Mobile Originated SMS on this selected session, user fill in the SMPP parameters, or load it from SMPP Preset page, and press the Submit button to generate one Mobile Originated SMS on active session.
	1. For Stress Testing of Mobile Oriignated SMS, user click on Stress Testing
		- Upload the list of MSISDN to be used as Source address, and press the Begin Stress Test button.
		- Press the Start button to start Stress Testing
		- Press the Stop button to stop Stress Testing



