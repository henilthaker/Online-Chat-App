import { EmojiEmotions, AttachFile } from '@mui/icons-material';
import { Box, InputBase, styled } from '@mui/material';
import '../../styles/chat.css'

const Container = styled(Box)`
    height: 55px;
    background: #ededed;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &  > * {
        margin: 5px;
        color: #919191;
    }
`;

const Footer = () => {

    return (
        <Container>
            <EmojiEmotions />
            <label htmlFor="fileInput">
                <AttachFile className='ClipIcon' />
            </label>
            <input
                type='file'
                id="fileInput"
                style={{ display: 'none' }}
            />

            <Box className="Search">
                <InputBase className='InputField'
                />
            </Box>
        </Container>
    )
}

export default Footer;