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
    options = {"media": "A4", "fit-to-page": True}

    # Print the file
    job_id = conn.printFile(printer_name, file_path, "Print Job", options=options)

    print(f"Job '{job_id}' sent to printer '{printer_name}'.")


# Example usage
file_path = "/path/to/your/file.png"
printer_name = (
    "your_printer_name"  # You can find your printer name using the 'lpstat -a' command
)
print_png(file_path, printer_name)
