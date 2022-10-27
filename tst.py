from os import listdir, chdir

chdir(r'C:\\Users\\Sharthak Sharma\\Documents\\Javascript\\canvas_projects')

for file in listdir():
	f_name = 'routes\\' +  file.split('.')[0] + '.html'
	# print(f_name)
	with open(f_name, 'w') as f:
		f.write(f'''
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="style.css">
	<script src="./{file}"></script>
	<title>{file.split('.')[0].capitalize()}</title>
</head>
<body>
<h1>{file.split('.')[0].capitalize()}</h1>
</body>
</html>''')