const colors = require('colors');
const { dir } = require('console');

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

loop_grid(true)

async function loop_grid(doubles) {

    
    let grid = initialize()
    let base_grid = initialize()

    let cols = [4,5,6]
    let rows = [5,5,5]
    let index = []

    directions = [4,4,4]
    index = arr_to_index(rows, cols)
    let exists = false
    process.stdin.on('keypress', (str, key) => {
        if (key.name === 'w') {
            if (directions[directions.length-1] != 3) {
                directions[directions.length-1] = 2
            }
        } else if (key.name === 'a'){
            if (directions[directions.length-1] != 4) {
                directions[directions.length-1] = 1
            }
        } else if (key.name === 's'){
            if (directions[directions.length-1] != 2) {
                directions[directions.length-1] = 3
            }
        } else if (key.name === 'd'){
            if (directions[directions.length-1] != 1) {
                directions[directions.length-1] = 4
            }
        } else if (key.name === 'q'){
            process.exit();
        }
    });
    while (true) {
        grid = app_handler(index, grid)
        index = arr_to_index(rows, cols)
        grid = upd_snake(index, base_grid)
        index = move(rows, cols, directions)
        directions = dir_handle(directions)

        print_grid(grid, doubles)
        await new Promise(resolve => setTimeout(resolve, 200));
        console.clear()
    }
    
}

function initialize(){
    const grid = []

    for (i = 0; i < 144; i++) {
            grid.push("#")
    }
    return grid
}

function print_grid(grid, doubles){
    if (doubles){
        for (i=0; i<grid.length; i++){
            if (i % 12 == 0){
                process.stdout.write("\n");
                    for(let j = i; j<i+12; j++){
                        if (grid[j] == "0") {
                            process.stdout.write(grid[j].blue.bold.italic + "/".blue);
                            process.stdout.write(grid[j].blue.bold.italic + "/".blue);
                        } else if (grid[i] == "^"){
                            process.stdout.write(grid[i].red + "/".red);
                            process.stdout.write(grid[i].red + "/".red);
                        } else if (grid[i] == "#"){
                            process.stdout.write(grid[i].green + "/".green.bold);
                            process.stdout.write(grid[i].green + "/".green.bold);
                        } 
                    }
                process.stdout.write("\n");
            }
            if (grid[i] == "0") {
                process.stdout.write(grid[i].blue.bold.italic + "/".blue);
                process.stdout.write(grid[i].blue.bold.italic + "/".blue);
            }
            if (grid[i] == "^"){
                process.stdout.write(grid[i].red + "/".red);
                process.stdout.write(grid[i].red + "/".red);
            }
            if (grid[i] == "#") {
                process.stdout.write(grid[i].green + "/".green);
                process.stdout.write(grid[i].green + "/".green);
            }
        }  
    } else {
        for (i=0; i<grid.length; i++){
            if (i % 12 == 0) {
                process.stdout.write("\n")
            }
            if (grid[i] == "0") {
                process.stdout.write(grid[i].blue.bold.italic + "/".blue);
            }
            if (grid[i] == "^"){
                process.stdout.write(grid[i].red + "/".red);
            }
            if (grid[i] == "#") {
                process.stdout.write(grid[i].green + "/".green);
            } if (grid[i] == "+") {
                process.stdout.write(grid[i])
            }
        }
    }
}

function point_to_index(x,y) {
    return (x*12)+y
}

function arr_to_index(rows, cols) {
    const index = []
    for (i=0; i<rows.length; i++) {
        index.push(point_to_index(rows[i], cols[i]))
    }
    return index
}

function upd_snake(index, base_grid) {
    let grid_upd = initialize()
    for (i=0;i<index.length;i++){
        grid_upd[index[i]] = "0"
    }
    return grid_upd
}

function move(rows, col, directions) {
    let col_c = col;
    let row_c = rows
    const dir_c = directions
    for (let i=0;i<col_c.length;i++){
        if (dir_c[i] == 4){
            col_c[i] = col_c[i]+1
        } else if (dir_c[i] == 2) {
            row_c[i] = row_c[i]-1
        } else if (dir_c[i] == 1) {
            col_c[i] = col_c[i]-1
        } else if (dir_c[i] == 3) {
            row_c[i] = row_c[i]+1
        } 
    }
    return arr_to_index(rows, col_c)
}

function dir_handle(directions){
    let dir_cop = directions;
    for (let i = 0; i<dir_cop.length-1;i++){
        if (dir_cop[i] != dir_cop[i+1]){
            dir_cop[i] = dir_cop[i+1]
        }
    }
    return dir_cop
}

function app_handler(index, grid) {
    let grid_c = grid

    if(grid_c.indexOf("^") == -1) {
        console.log("true")
    }
    while (true){
        let max = 144
        let min = 1
        let rand = Math.round(Math.random() * (max - min) + min)


        if (index.indexOf(rand) > -1) {

        } else {
            grid_c[rand] = "^"
            break
        }
    }
    if(grid_c.indexOf("#") == -1) {
        console.log("true")
    }

    return grid_c
}