// Получаем элементы слайдера
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const slides = Array.from(slider.querySelectorAll('img'));
const slideCount = slides.length;
let slideIndex = 0;

// Устанавливаем обработчики событий для кнопок
prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

// Функция для показа предыдущего слайда
function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}

// Функция для показа следующего слайда
function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}

// Функция для обновления отображения слайдера
function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}

// Инициализация слайдера
updateSlider();

import { fileURLToPath } from 'url'
import path from 'path'

import fs from 'fs'
import http, { request } from "http"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let server = http.createServer(function(request, response) {
  let indexPage = fs.readFileSync(path.join(__dirname, "index.html"))
 
  if (request.url == "/") {
    response.writeHead(200, { "Content-Type": "text/html" })
    response.end(indexPage)
  }

  else if (request.url == "/message" && request.method == "POST") {
    let data = ""
    request.on("data", function(chunk) {
      data += chunk;
    })
    request.on("end", function() {
      let search = new URLSearchParams(data)
      let name = search.get("firstName")
      let email = search.get("gmail")
      let message = search.get("message")
    
    
 
      fs.appendFileSync(path.join(__dirname, "admin.txt"), `\nПолучено новое сообщение!(\n
          Имя: ${name},\n
          Почта: ${email},\n
          Сообщение: ${message};\n
      )\n`)
    })
    response.writeHead(302, { "Location": "/" })
    response.end("Sent successfully!")
   

  
  }


  else{
    response.writeHead(200, { "Content-Type": "text/html" })
    response.end(`<div style="display:flex; width:100%;flex-direction:column; align-items:center;"><h1>404</h1><br><hr style="width:100%; background:black; color:black;"><br><h1>Page not found</h1></div>`)
  }
})

server.listen(3000)