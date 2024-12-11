// To navigate to a screen, return the corresponding response from the endpoint. Make sure the response is enccrypted.
const SCREEN_RESPONSES = {
    APPOINTMENT: {
        "screen": "APPOINTMENT",
        "data": {
            "department": [
                {
                    "id": "cardiology",
                    "title": "Cardiology"
                },
                {
                    "id": "neurology",
                    "title": "Neurology"
                },
                {
                    "id": "orthopedics",
                    "title": "Orthopedics"
                },
                {
                    "id": "pediatrics",
                    "title": "Pediatrics"
                },
                {
                    "id": "general",
                    "title": "General Medicine"
                }
            ],
            "date": [
                {
                    "id": "2024-01-01",
                    "title": "Mon Jan 01 2024"
                },
                {
                    "id": "2024-01-02",
                    "title": "Tue Jan 02 2024"
                },
                {
                    "id": "2024-01-03",
                    "title": "Wed Jan 03 2024"
                }
            ],
            "is_date_enabled": true,
            "time": [
                {
                    "id": "10:30",
                    "title": "10:30"
                },
                {
                    "id": "11:00",
                    "title": "11:00",
                    "enabled": false
                },
                {
                    "id": "11:30",
                    "title": "11:30"
                },
                {
                    "id": "12:00",
                    "title": "12:00",
                    "enabled": false
                },
                {
                    "id": "12:30",
                    "title": "12:30"
                }
            ],
            "is_time_enabled": true
        }
    },
    DETAILS: {
        "screen": "DETAILS",
        "data": {
            "department": "cardiology",
            "date": "2024-01-01",
            "time": "11:30"
        }
    },
    SUMMARY: {
        "screen": "SUMMARY",
        "data": {
            "appointment": "MRI SCAN",
            "details": "Name: John Doe\nEmail: john@example.com\nPhone: 123456789\n\nA free skin care consultation, please",
            "department": "cardiology",
            "date": "2024-01-01",
            "time": "11:30",
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "123456789",
            "more_details": "A MRI Scan, please"
        }
    },
    TERMS: {
        "screen": "TERMS",
        "data": {}
    },
    SUCCESS: {
        "screen": "SUCCESS",
        "data": {
            "extension_message_response": {
                "params": {
                    "flow_token": "REPLACE_FLOW_TOKEN",
                    "some_param_name": "PASS_CUSTOM_VALUE"
                }
            }
        }
    },
};

export const getNextScreen = async (decryptedBody) => {
    const { screen, data, version, action, flow_token } = decryptedBody;
    // handle health check request
    if (action === "ping") {
        return {
            data: {
                status: "active",
            },
        };
    }

    // handle error notification
    if (data?.error) {
        console.warn("Received client error:", data);
        return {
            data: {
                acknowledged: true,
            },
        };
    }

    // handle initial request when opening the flow and display APPOINTMENT screen
    if (action === "INIT") {
        return {
            ...SCREEN_RESPONSES.APPOINTMENT,
            data: {
                ...SCREEN_RESPONSES.APPOINTMENT.data,
                // these fields are disabled initially. Each field is enabled when previous fields are selected
                is_location_enabled: false,
                is_date_enabled: false,
                is_time_enabled: false,
            },
        };
    }

    if (action === "data_exchange") {
        // handle the request based on the current screen
        switch (screen) {
            // handles when user interacts with APPOINTMENT screen
            case "APPOINTMENT":
                // update the appointment fields based on current user selection
                return {
                    ...SCREEN_RESPONSES.APPOINTMENT,
                    data: {
                        // copy initial screen data then override specific fields
                        ...SCREEN_RESPONSES.APPOINTMENT.data,
                        // each field is enabled only when previous fields are selected
                        is_location_enabled: Boolean(data.department),
                        is_date_enabled: Boolean(data.department) && Boolean(data.location),
                        is_time_enabled:
                            Boolean(data.department) &&
                            Boolean(data.location) &&
                            Boolean(data.date),

                        //TODO: filter each field options based on current selection, here we filter randomly instead
                        date: SCREEN_RESPONSES.APPOINTMENT.data.date.slice(0, 3),
                        time: SCREEN_RESPONSES.APPOINTMENT.data.time.slice(0, 3),
                    },
                };

            // handles when user completes DETAILS screen
            case "DETAILS":
                // the client payload contains selected ids from dropdown lists, we need to map them to names to display to user
                const departmentName =
                    SCREEN_RESPONSES.APPOINTMENT.data.department.find(
                        (dept) => dept.id === data.department
                    ).title;

                const dateName = SCREEN_RESPONSES.APPOINTMENT.data.date.find(
                    (date) => date.id === data.date
                ).title;

                const appointment = `${departmentName} on ${dateName} at ${data.time}`;

                const details = `Name: ${data.name}
                                    Email: ${data.email}
                                    Phone: ${data.phone}
                                    "${data.more_details}"`;

                return {
                    ...SCREEN_RESPONSES.SUMMARY,
                    data: {
                        appointment,
                        details,
                        // return the same fields sent from client back to submit in the next step
                        ...data,
                    },
                };

            // handles when user completes SUMMARY screen
            case "SUMMARY":
                // TODO: save appointment to your database
                // send success response to complete and close the flow
                return {
                    ...SCREEN_RESPONSES.SUCCESS,
                    data: {
                        extension_message_response: {
                            params: {
                                flow_token,
                            },
                        },
                    },
                };

            default:
                break;
        }
    }

    console.error("Unhandled request body:", decryptedBody);
    throw new Error(
        "Unhandled endpoint request. Make sure you handle the request action & screen logged above."
    );
};