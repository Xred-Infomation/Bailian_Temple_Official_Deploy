<script setup>
import '@/assets/styles/About.css'
import { aboutText } from '@/data/AboutText'
</script>
<template>
  <main>
    <div class="about-container">
      <section class="header-section">
        <h1 class="main-title">願與您結一段善緣</h1>
        <p class="subtitle"></p>
      </section>

      <section class="content-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7251.356320374456!2d121.7450345389909!3d24.669204014080876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3467e693eca5bab5%3A0x7abeed16d7d426fd!2z55m96JOu5a-6!5e0!3m2!1szh-TW!2stw!4v1749519618431!5m2!1szh-TW!2stw"
          width="600"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          class="about-image"
        ></iframe>
        <div class="about-text">
          <h3>{{ aboutText.contact1 }}</h3>
          <p>{{ aboutText.contact2 }}</p>
          <hr class="divider" />
          <div class="social-block">
            <h3>餐廳社群</h3>
            <ul class="social-icons">
              <li>
                <a href="https://lin.ee/u3anQP0" target="_blank" aria-label="Line 餐廳">
                  <img src="@/assets/images/line.png" alt="Line" loading="lazy" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/bailiantemple/"
                  target="_blank"
                  aria-label="Facebook 餐廳"
                >
                  <img src="@/assets/images/facebook.png" alt="Facebook" loading="lazy" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/bailiantemple/"
                  target="_blank"
                  aria-label="Instagram 餐廳"
                >
                  <img src="@/assets/images/instagram.png" alt="Instagram" loading="lazy" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.threads.com/@bailiantemple"
                  target="_blank"
                  aria-label="Threads 餐廳"
                >
                  <img src="@/assets/images/threads.png" alt="Threads" loading="lazy" />
                </a>
              </li>
            </ul>
          </div>
          <hr class="divider" />
          <div class="social-block">
            <h3>學院社群</h3>
            <ul class="social-icons">
              <li>
                <a href="https://lin.ee/fY3wJNC" target="_blank" aria-label="Line 學院">
                  <img src="@/assets/images/line.png" alt="Line" loading="lazy" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/songlingschool/"
                  target="_blank"
                  aria-label="Facebook 學院"
                >
                  <img src="@/assets/images/facebook.png" alt="Facebook" loading="lazy" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/songlingschool/"
                  target="_blank"
                  aria-label="Instagram 學院"
                >
                  <img src="@/assets/images/instagram.png" alt="Instagram" loading="lazy" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.threads.com/@songlingschool"
                  target="_blank"
                  aria-label="Threads 學院"
                >
                  <img src="@/assets/images/threads.png" alt="Threads" loading="lazy" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
