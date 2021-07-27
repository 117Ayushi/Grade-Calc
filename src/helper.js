let arr_mean = (arr, n) => {
    let sum = 0
    for (let i = 0; i < n; i++) {
        if (arr[i][9] !== "undefined" && arr[i][9] !== undefined) {
            sum = sum + arr[i][9]
        }
    }
    return sum / n
}

let standard_deviation = (n, mean, arr) => {
    let deviation_arr = []
    for (let i = 0; i < n; i++) {
        if (arr[i][9] !== "undefined" && arr[i][9] !== undefined) {
            deviation_arr.push(arr[i][9])
        }
    }
    let deviation = Math.sqrt(deviation_arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
    return deviation
}

let arr_max = (arr) => {
    let max = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][9] !== "undefined" && arr[i][9] !== undefined) {
            max = Math.max(max, arr[i][9])
        }
    }
    return max
}

let arr_min = (arr) => {
    let min = 150
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][9] !== "undefined" && arr[i][9] !== undefined) {
            min = Math.min(min, arr[i][9])
        }
    }
    return min
}

let arr_median = (arr) => {
    let new_arr = []
    for (let k = 0; k < arr.length; k++) {
        if (arr[k][9] !== "undefined" && arr[k][9] !== undefined) {
            new_arr.push(arr[k][9])
        }
    }

    new_arr.sort(function (a, b) {
        return a - b;
    });
    let mid = new_arr.length / 2;
    return mid % 1 ? new_arr[mid - 0.5] : (new_arr[mid - 1] + new_arr[mid]) / 2;
}

let total_each_grade = (arr) => {
    let dict = {}
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][10] !== "undefined" && arr[i][10] !== undefined) {
            if (dict[arr[i][10]]) {
                dict[arr[i][10]] += 1
            } else {
                dict[arr[i][10]] = 1
            }
        }
    }
    return dict
}

let get_percentage = (num, total) => {
    return ((num / total) * 100)
}

function get_grade(x, max_grade_f, max_grade_e_minus, max_grade_e, max_grade_d_minus, max_grade_d, max_grade_c_minus, max_grade_c, max_grade_b_minus, max_grade_b, max_grade_a_minus, max_grade_a) {
    if (x < max_grade_f) {
        return 'F'
    } else if (x < max_grade_e_minus && x >= max_grade_f) {
        return 'E-'
    } else if (x < max_grade_e && x >= max_grade_e_minus) {
        return 'E'
    } else if (x < max_grade_d_minus && x >= max_grade_e) {
        return 'D-'
    } else if (x < max_grade_d && x >= max_grade_d_minus) {
        return 'D'
    } else if (x < max_grade_c_minus && x >= max_grade_d) {
        return 'C-'
    } else if (x < max_grade_c && x >= max_grade_c_minus) {
        return 'C'
    } else if (x < max_grade_b_minus && x >= max_grade_c) {
        return 'B-'
    } else if (x < max_grade_b && x >= max_grade_b_minus) {
        return 'B'
    } else if (x < max_grade_a_minus && x >= max_grade_b) {
        return 'A-'
    } else if (x < max_grade_a && x >= max_grade_a_minus) {
        return 'A'
    } else {
        return 'NA'
    }
}

function get_relative_grade(arr) {
    let n = 0;
    for (let k = 0; k < arr.length; k++) {
        if (arr[k][9] !== "undefined" && arr[k][9] !== undefined) {
            n++
        }
    }

    let mean = arr_mean(arr, n);
    let deviation = standard_deviation(n, mean, arr);

    for (let l = 0; l < n; l++) {
        if (arr[l][9] !== "undefined" && arr[l][9] !== undefined) {
            if (arr[l][9] >= 0 && arr[l][9] < 15) {
                if (arr[l].length < 11) {
                    arr[l].push('F')
                } else {
                    arr[l].pop()
                    arr[l].push('F')
                }
            } else if (arr[l][9] >= 15 && arr[l][9] < 29) {
                if (arr[l].length < 11) {
                    arr[l].push('E')
                } else {
                    arr[l].pop()
                    arr[l].push('E')
                }
            } else if (arr[l][9] >= 30 && arr[l][9] < 38) {
                if (arr[l].length < 11) {
                    arr[l].push('E')
                } else {
                    arr[l].pop()
                    arr[l].push('E')
                }
            } else if (arr[l][9] >= 38 && arr[l][9] < 54) {
                if (arr[l].length < 11) {
                    arr[l].push('D-')
                } else {
                    arr[l].pop()
                    arr[l].push('D-')
                }
            } else if (arr[l][9] >= 54 && arr[l][9] < 60) {
                if (arr[l].length < 11) {
                    arr[l].push('D')
                } else {
                    arr[l].pop()
                    arr[l].push('D')
                }
            } else if (arr[l][9] > 60 && arr[l][9] <= mean) {
                if (arr[l].length < 11) {
                    arr[l].push('C-')
                } else {
                    arr[l].pop()
                    arr[l].push('C-')
                }
            } else if (arr[l][9] > (mean) && arr[l][9] <= (mean + (0.5 * deviation))) {
                if (arr[l].length < 11) {
                    arr[l].push('C')
                } else {
                    arr[l].pop()
                    arr[l].push('C')
                }
            } else if (arr[l][9] > (mean + (0.5 * deviation)) && arr[l][9] <= (mean + (1 * deviation))) {
                if (arr[l].length < 11) {
                    arr[l].push('B-')
                } else {
                    arr[l].pop()
                    arr[l].push('B-')
                }
            } else if (arr[l][9] > (mean + (1 * deviation)) && arr[l][9] <= (mean + (1.5 * deviation))) {
                if (arr[l].length < 11) {
                    arr[l].push('B')
                } else {
                    arr[l].pop()
                    arr[l].push('B')
                }
            } else if (arr[l][9] > (mean + (1.5 * deviation)) && arr[l][9] <= (mean + (2 * deviation))) {
                if (arr[l].length < 11) {
                    arr[l].push('A-')
                } else {
                    arr[l].pop()
                    arr[l].push('A-')
                }
            } else if (arr[l][9] > (mean + (2 * deviation))) {
                if (arr[l].length < 11) {
                    arr[l].push('A')
                } else {
                    arr[l].pop()
                    arr[l].push('A')
                }
            } else {
                arr[l].push('NA')
            }
        }
    }
    return arr
}

function get_percent_grade(number) {
    let percentage = get_percentage(number, 150)

    if (percentage > 89 && percentage <= 100) {
        return "A"
    } else if (percentage > 79 && percentage <= 89) {
        return "A-"
    } else if (percentage > 69 && percentage <= 79) {
        return "B"
    } else if (percentage > 59 && percentage <= 69) {
        return "B-"
    } else if (percentage > 49 && percentage <= 59) {
        return "C"
    } else if (percentage > 39 && percentage <= 49) {
        return "C-"
    } else if (percentage > 33 && percentage <= 39) {
        return "D"
    } else if (percentage > 29 && percentage <= 33) {
        return "D-"
    } else if (percentage > 19 && percentage <= 29) {
        return "E"
    } else if (percentage > 9 && percentage <= 19) {
        return "E-"
    } else if (percentage > 0 && percentage <= 9) {
        return "F"
    } else {
        return "NA"
    }
}

function get_chart_data(total_grade_in_category, all_grades) {
    let chart_data = all_grades.map((grade) => {
        if (total_grade_in_category[grade] && total_grade_in_category[grade] > 0) {
            return total_grade_in_category[grade]
        } else {
            return 0
        }
    })

    return chart_data

}

module.exports = {
    get_grade,
    get_relative_grade,
    get_percent_grade,
    arr_max,
    arr_min,
    arr_median,
    arr_mean,
    standard_deviation,
    total_each_grade,
    get_chart_data
}