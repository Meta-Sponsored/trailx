import cups

# Define the file path for the print file and the printer name.
PRINT_FILE_PATH = "receipts/receipt_template_58_mm.png"
PRINTER_NAME = "PT-210"


def print_receipt(file_path, printer_name):
    """
    This function prints a receipt from a given file path to a specified printer.

    It establishes a connection to CUPS (Common UNIX Printing System),
    checks if the specified printer is available, and sends the print job
    to the printer with specific print options.

    Args:
        file_path (str): The file path of the document to be printed.
        printer_name (str): The name of the printer to send the job to.
    """

    # Establish a connection to the CUPS server.
    conn = cups.Connection()

    # Retrieve a dictionary of available printers.
    printers = conn.getPrinters()

    # Check if the specified printer exists in the list of available printers.
    if printer_name not in printers:
        print(f"Printer '{printer_name}' not found.")
        return

    # Define the printer options, such as paper size and fitting the print to the page.
    options = {"media": "48.0mmx250.0mm", "fit-to-page": "True"}

    # Send the print job to the specified printer with the defined options.
    job_id = conn.printFile(
        str(printer_name), str(file_path), "Print Job", options=options
    )

    # Print a message indicating the job has been sent.
    print(f"Job '{job_id}' sent to printer '{printer_name}'.")


def tester():
    """
    This is a test function to demonstrate the use of print_receipt.

    It calls the print_receipt function with predefined file path and printer name.
    """
    print_receipt(PRINT_FILE_PATH, PRINTER_NAME)


# Run the test function.
tester()
