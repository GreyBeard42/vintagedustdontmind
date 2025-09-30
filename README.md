# Vintage Dust, Don't Mind
Encrypt text into a user provided image using blue pixels.

Images are stored with red, green, and blue pixels with values between 0-255 right?

What if we threw out the blue one and used the storage for text?

So I convert text to 0-255 values using `TextEncoder()`

Then replace the blue pixels and download it ✅

The empty space in the image is filled with random noise for effect, seperated by five blue pixels valued zero.

### Example:
<img width="42" height="24" alt="vintagedustdontmind" src="https://github.com/user-attachments/assets/6d8efab4-b172-4e7b-b853-7b50d300a65b" />
