const { createApp, ref, onMounted } = Vue;

createApp({
    setup() {
        const darkMode = ref(false);
        
        // Toggle dark/light mode
        const toggleTheme = () => {
            darkMode.value = !darkMode.value;
            document.documentElement.classList.toggle('dark', darkMode.value);
            localStorage.setItem('darkMode', darkMode.value);
            
            // Update theme toggle icon
            const icon = document.querySelector('#themeToggle i');
            if (darkMode.value) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        };
        
        // Download resume function
        const downloadResume = () => {
            alert('Downloading resume...');
            // In a real implementation, this would trigger a file download
            // window.location.href = 'path/to/resume.pdf';
        };
        
        // Initialize theme from localStorage
        onMounted(() => {
            // Check for saved theme preference
            if (localStorage.getItem('darkMode') === 'true') {
                toggleTheme();
            }
            
            // Add scroll animation triggers
            const animateOnScroll = () => {
                const elements = document.querySelectorAll('.scroll-animate');
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.3;
                    
                    if (elementPosition < screenPosition) {
                        element.classList.add('animate');
                    }
                });
            };
            
            // Initial check
            animateOnScroll();
            
            // Add scroll event listener
            window.addEventListener('scroll', animateOnScroll);
            
            // Progress bar animation
            window.addEventListener('scroll', () => {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                document.getElementById('progressBar').style.width = scrolled + '%';
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });
        
        return {
            darkMode,
            toggleTheme,
            downloadResume
        }
    }
}).mount('#app');