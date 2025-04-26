function MessageInput({ sendMessageHandler }) {
  return (
    <>
      <div className="w-full h-[12%]">
        <form
          className="flex w-full items-center justify-center space-x-1 p-1 rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            sx={{
              width: "90%",
              borderRadius: "10px",
              overflow: "hidden",
            }}
            id="filled-multiline-flexible"
            label="Message"
            multiline
            maxRows={1}
            variant="filled"
            {...register("content")}
          />
          <Button
            type="submit"
            disabled={isPending}
            sx={{
              height: "100%",
              width: "10%",
              backgroundColor: "lightgray",
              "&:hover": {
                opacity: "0.7",
              },
            }}
          >
            {isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <SendRoundedIcon fontSize="large" />
            )}
          </Button>
        </form>
      </div>
    </>
  );
}

export default MessageInput;
