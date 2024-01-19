import cups

def print_png(file_path, printer_name):
    conn = cups.Connection()

    # Get a list of printers
    printers = conn.getPrinters()

    # Check if the specified printer exists
    if printer_name not in printers:
        print(f"Printer '{printer_name}' not found.")
        return

    # Set the printer options (you may need to adjust these based on your printer)
    options = {"media": "48.0mmx250.0mm", "fit-to-page": "True"}

    # Print the file
    job_id = conn.printFile(str(printer_name), str(file_path), "Print Job", options=options)

    print(f"Job '{job_id}' sent to printer '{printer_name}'.")


# Example usage
FILE_PATH = "/home/trailx/Desktop/2023_TrailX/Chiawei/Week 10 (1127~1201)/receipts/receipt_template_58_mm.png"
PRINTER_NAME = "PT-210"
print_png(FILE_PATH, PRINTER_NAME)
