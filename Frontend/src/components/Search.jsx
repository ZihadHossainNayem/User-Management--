import { useState } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const Search = () => {
  const [searchParams, setSearchParams] = useState({
    username: "",
    fullName: "",
    phone: "",
    role: "",
  });
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const openModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeModal = () => {
    setIsSearchModalOpen(false);
  };

  const handleSearch = async () => {
    try {
      const queryParams = new URLSearchParams(searchParams).toString();
      const response = await fetch(
        `https://localhost:44352/api/Search?${queryParams}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      setSearchResults(data);
      console.log("Search Results:", data);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  return (
    <Box>
      <Button
        sx={{
          marginRight: "8px",
        }}
        variant="outlined"
        color="primary"
        onClick={openModal}
      >
        <SearchIcon />
      </Button>
      <Modal
        open={isSearchModalOpen}
        onClose={closeModal}
        aria-labelledby="search-modal"
        aria-describedby="search-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: "30px",
            maxWidth: "500px",
            borderRadius: "5px",
            position: "relative",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Search User
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            size="small"
            name="username"
            value={searchParams.username}
            onChange={handleSearchChange}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Full Name"
            size="small"
            name="fullName"
            value={searchParams.fullName}
            onChange={handleSearchChange}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Phone"
            size="small"
            name="phone"
            value={searchParams.phone}
            onChange={handleSearchChange}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Role"
            size="small"
            name="role"
            value={searchParams.role}
            onChange={handleSearchChange}
            sx={{ marginBottom: "16px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ marginRight: "8px" }}
          >
            Search
          </Button>
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              color: "white",
              backgroundColor: "#ef5350",
              "&:hover": {
                backgroundColor: "#e53935",
                color: "white",
              },
            }}
            onClick={closeModal}
          >
            <CloseIcon />
          </IconButton>

          {searchResults.map((result) => (
            <div key={result.id}>
              <Box>
                {result.fullName} {result.username} {result.phone} {result.role}{" "}
                {result.password}
              </Box>
            </div>
          ))}
        </Box>
      </Modal>
    </Box>
  );
};

export default Search;
