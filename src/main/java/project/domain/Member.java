package project.domain;

public class Member {
	private int no;
	private String email;
	private String name;
	private String password;
	private String tel;
	private String posi;
	
	@Override
	public String toString() {
		return "Member [no=" + no + ", email=" + email + ", name=" + name + ", password=" + password + ", tel=" + tel
				+ ", posi=" + posi + "]";
	}
	
	public int getNo() {
		return no;
	}
	public void setNo(int no) {
		this.no = no;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getpassword() {
		return password;
	}
	public void setpassword(String password) {
		this.password = password;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getPosi() {
		return posi;
	}
	public void setPosi(String posi) {
		this.posi = posi;
	}
	
	
}