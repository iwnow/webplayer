namespace api.Models
{
  using System;
  using System.ComponentModel.DataAnnotations;
  using System.ComponentModel.DataAnnotations.Schema;
  
  public class Track {
    
    [Key] [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id {get;set;}
    public string Name {get;set;}
    public string PathName {get;set;}

    [NotMapped]
    public byte[] Content {get;set;}
    public DateTime Created {get;set;}
  }
}