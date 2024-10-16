$(document).ready(function() {
    // Initialize Bootstrap select plugin
    $('.selectpicker').selectpicker();

    // File input initialization
    $('#file-upload').fileinput({
        showUpload: false, 
        previewFileType: 'any',
        browseClass: 'btn btn-success',
        removeClass: 'btn btn-danger',
        allowedFileExtensions: ['jpg', 'jpeg', 'png', 'gif', 'pdf']
    });

    // Form Validation
    $('#registration-form').on('submit', function(event) {
        event.preventDefault();
        var isValid = true;

        // Name validation
        if ($('#name').val().trim() === '') {
            $('#name-error').text('Name is required.');
            isValid = false;
        } else {
            $('#name-error').text('');
        }

        // Email validation
        var email = $('#email').val().trim();
        if (!isValidEmail(email)) {
            $('#email-error').text('Valid email is required.');
            isValid = false;
        } else {
            $('#email-error').text('');
        }

        if (isValid) {
            // Submit form via AJAX or standard submit
            console.log('Form is valid and ready to be submitted');
            this.submit();
        }
    });

    // Email validation function
    function isValidEmail(email) {
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    // Show/hide password
    $('#show-password').on('click', function() {
        var passwordField = $('#password');
        var type = passwordField.attr('type');
        if (type === 'password') {
            passwordField.attr('type', 'text');
            $(this).text('Hide Password');
        } else {
            passwordField.attr('type', 'password');
            $(this).text('Show Password');
        }
    });

    // Modal Popup on Login Error
    if ($('#login-error').length) {
        $('#login-modal').modal('show');
    }

    // Smooth scrolling for anchor links
    $('a.scroll-link').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    // FAQ toggle functionality
    $('.faq-question').on('click', function() {
        var answer = $(this).next('.faq-answer');
        answer.slideToggle();
        $(this).toggleClass('open');
    });

    // Initialize Bootstrap tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Dynamic candidate profile filtering
    $('#candidate-filter').on('change', function() {
        var filter = $(this).val();
        $('.candidate').hide();
        $('.candidate.' + filter).show();
    });

    // Datepicker for job applications
    $('#application-date').datepicker({
        format: 'mm/dd/yyyy',
        autoclose: true
    });

    // Job application form submit
    $('#application-form').on('submit', function(event) {
        event.preventDefault();
        var formData = $(this).serialize();
        
        $.ajax({
            url: 'submit_application.php',
            type: 'POST',
            data: formData,
            success: function(response) {
                $('#application-success').text('Application submitted successfully!').show();
            },
            error: function() {
                $('#application-error').text('Error submitting application. Please try again.').show();
            }
        });
    });
});
