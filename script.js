let input = document.getElementById("text")
let file, img, file2

async function setup() {
    let s = max(min(windowWidth/2, 500), 200)
    createCanvas(s, s).parent("canvas")
    img = await loadImage("image.jpg")
    background(255)

    if(!file) file = createFileInput(handleFile).parent("fileouter")

    if(!file2) file2 = createFileInput(decode).parent("decodeouter")
}

function download() {
    img.loadPixels()
    
    let encoder = new TextEncoder()
    let values = encoder.encode(input.value)

    //resize
    let pixels = max(values.length,1000)
    let scale = sqrt(pixels / (img.width * img.height))
    let newW = max(1, round(scale * img.width))
    let newH = max(1, round(scale * img.height))
    while (newW * newH < pixels) {
        if (newW <= newH) {
            newW++
        } else {
            newH++
        }
    }
    img.resize(newW, newH)
    img.loadPixels()
    resizeCanvas(img.width, img.height)
    
    //update
    let byteIndex = 0
    for (let i = 0; i < img.pixels.length; i += 4) {
        if (byteIndex < values.length) {
            img.pixels[i + 2] = values[byteIndex++]
        } else if (byteIndex < values.length + 6) {
            img.pixels[i + 2] = 0
            byteIndex++
        } else {
            img.pixels[i + 2] = floor(random(1, 150))
        }
    }
    img.updatePixels()
    console.log(img.pixels)

    //save
    save(img, 'vintagedustdontmind.png')
    file.remove()
    file = false
    setup()
}

function decode(file) {
    if (file.type === 'image') {
        loadImage(file.data, loadedImage => {
            img = loadedImage
            img.loadPixels()
            console.log(img.pixels)

            let decoder = new TextDecoder()
            let output = []
            
            let zeroCount = 0
            for (let i = 0; i < img.pixels.length; i += 4) {
                let val = img.pixels[i + 2]
                if (val === 0) {
                    zeroCount++
                    if (zeroCount >= 4) {
                        break
                    }
                } else {
                    for (let z = 0; z < zeroCount; z++) output.push(0)
                    zeroCount = 0
                    output.push(val)
                }
            }

            console.log(JSON.stringify(output))
            output = new Uint8Array(output)

            //console.log(decoder.decode(output))
            input.value = decoder.decode(output)
        })
    }
}

function handleFile(file) {
    if (file.type === 'image') {
        loadImage(file.data, loadedImage => {
            img = loadedImage
        })
    }
}