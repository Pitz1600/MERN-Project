# For initial configuration
python -m venv venv

# Run venv
venv/Scripts/activate

# install dependencies
pip install -r requirements.txt

# run test.py
python test.py

# It should show pytorch doesn't exist you need to install it on your own
# click the link shown in the error follow the instruction on the pytorch
# website

# run test.py again
python test.py

# It should run without error. mention me on gc if there's an error running the program
# The initial start of the program is long since it's installing the model from hugging_face after that you can now run the program offline.
# Every time you start the program it needs to load the model so starting it is long but after that you can expect fast response when trying the model out.